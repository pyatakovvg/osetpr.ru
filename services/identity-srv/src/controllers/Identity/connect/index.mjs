
import { NotfoundError } from '@packages/errors';

import { sign } from '@sys.packages/jwt';
import { models, sequelize } from '@sys.packages/db';
import { genHash256, token } from '@sys.packages/utils';


export default () => async (ctx) => {
  const { User, RefreshToken, Role } = models;
  const { login, password } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  const hashPassword = genHash256(password, process.env['PASSWORD_SALT']);
  const user = await User.findOne({
    attributes: ['uuid', 'login', 'createdAt', 'updatedAt'],
    where: {
      login,
      password: hashPassword
    },
    include: [
      {
        model: Role,
        required: true,
        attributes: ['code', 'displayName'],
        as: 'role',
      }
    ],
    transaction,
  });

  if ( ! user) {
    throw new NotfoundError('Неверный логин или пароль');
  }

  const foundUser = user.toJSON();

  // создаем токен для обновления
  const today = Date.now();
  const expirationTime = Number(today + Number(process.env['JWT_EXP'] * 60 * 1000));
  const expirationFullTime = Number(today + Number(process.env['JWT_EXP_END'] * 24 * 60 * 1000));
  const refreshToken = token(today + process.env['JWT_SECRET']).digest('hex');

  const currentIP = ctx['ips'].length > 0 ? ctx['ips'][ctx['ips'].length - 1] : ctx['ip'];

  await RefreshToken.destroy({
    where: {
      userUuid: foundUser['uuid'],
    },
    transaction,
  });

  await RefreshToken.create({
    userUuid: foundUser['uuid'],
    refreshToken: refreshToken,
    userAgent: ctx['userAgent']['source'],
    ip: currentIP,
    expiresIn: expirationFullTime,
  }, {
    transaction,
  });

  await transaction.commit();

  const result = await User.findOne({
    attributes: ['uuid', 'login', 'createdAt', 'updatedAt'],
    where: {
      uuid: foundUser['uuid'],
    },
    include: [
      {
        model: Role,
        required: true,
        attributes: ['code', 'displayName'],
        as: 'role',
      }
    ]
  });

  const userJSON = result.toJSON();

  // организуем авторизационный объект
  const payload = {
    uuid: userJSON['uuid'],
    role: userJSON['role']['code'],
    permissions: [],
    exp: parseInt(String(expirationTime / 1000), 10),
  };

  const identityToken = sign(payload, process.env['JWT_SECRET']);

  ctx.body = {
    success: true,
    data: {
      accessToken: identityToken,
      refreshToken: refreshToken,
    }
  };
};
