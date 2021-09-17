
import { NotfoundError } from '@packages/errors';

import { sign } from '@sys.packages/jwt';
import { models, sequelize } from '@sys.packages/db';
import { genHash256, token } from '@sys.packages/utils';


export default () => async (ctx) => {
  const { User, RefreshToken } = models;
  const { login, password } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  const hashPassword = genHash256(password, process.env['PASSWORD_SALT']);
  const user = await User.findOne({
    where: {
      login,
      password: hashPassword
    },
    transaction,
  });

  if ( ! user) {
    throw new NotfoundError('Неверный логин или пароль');
  }

  // создаем токен для обновления
  const today = Date.now();
  const expirationTime = Number(today + Number(process.env['JWT_EXP'] * 60 * 1000));
  const expirationFullTime = Number(today + Number(process.env['JWT_EXP_END'] * 24 * 60 * 1000));
  const refreshToken = token(today + process.env['JWT_SECRET']).digest('hex');

  const currentIP = ctx['ips'].length > 0 ? ctx['ips'][ctx['ips'].length - 1] : ctx['ip'];

  await RefreshToken.destroy({
    where: {
      userUuid: user['uuid'],
    },
    transaction,
  });

  await RefreshToken.create({
    userUuid: user['uuid'],
    refreshToken: refreshToken,
    userAgent: ctx['userAgent']['source'],
    ip: currentIP,
    expiresIn: expirationFullTime,
  }, {
    transaction,
  });

  await transaction.commit();

  // организуем авторизационный объект
  const payload = {
    uuid: user['uuid'],
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
