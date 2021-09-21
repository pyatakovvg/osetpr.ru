
import {BadRequestError, ExpiredError, NetworkError} from '@packages/errors';

import { models, sequelize } from '@sys.packages/db';
import { genHash256, token, UUID } from '@sys.packages/utils';
import { JsonWebTokenError, sign, TokenExpiredError } from '@sys.packages/jwt';


export default () => async (ctx) => {
  const { User, RefreshToken } = models;

  try {
    const formData = ctx.request['body'];

    const hasUser = await User.findOne({
      raw: true,
      where: {
        login: formData['login'],
      },
    });

    if (hasUser) {
      throw new BadRequestError('Пользователь "' + formData['login'] + '" уже зарегистрирован');
    }

    const transaction = await sequelize.transaction();

    const hashPassword = genHash256(formData['password'], process.env['PASSWORD_SALT']);

    const user = await User.create({
      uuid: UUID(),
      login: formData['login'],
      password: hashPassword,
      type: formData['type'],
    }, {
      transaction,
    });

    const today = Date.now();
    const expirationTime = Number(today + Number(process.env['JWT_EXP'] * 60 * 1000));
    const expirationFullTime = Number(today + Number(process.env['JWT_EXP_END'] * 24 * 60 * 1000));
    const refreshToken = token(today + process.env['JWT_SECRET']).digest('hex');

    const currentIP = ctx['ips'].length > 0 ? ctx['ips'][ctx['ips'].length - 1] : ctx['ip'];

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
      },
    };
  }
  catch (error) {

    console.log(error)

    if (error instanceof TokenExpiredError) {
      throw new ExpiredError({ code: '20.0.100', message: 'Время жизни токена истекло 1' });
    }
    else if (error instanceof JsonWebTokenError) {
      throw new BadRequestError({ code: '20.0.150', message: 'Невалидный токен' });
    }

    throw new NetworkError({ code: '20.0.200', message: error['data'] });
  }
};
