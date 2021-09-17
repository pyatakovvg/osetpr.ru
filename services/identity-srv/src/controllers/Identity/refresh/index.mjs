
import {BadRequestError, UnauthorizedError} from '@packages/errors';

import { models } from '@sys.packages/db';
import { decode, sign } from '@sys.packages/jwt';
import { token } from "@sys.packages/utils";


export default () => async (ctx) => {
  const { RefreshToken } = models;
  const { accessToken, refreshToken } = ctx['request']['body'];

  if ( ! accessToken || ! refreshToken) {
    throw new BadRequestError('Отсутствует токен авторизации');
  }

  const { payload } = decode(accessToken);

  const result = await RefreshToken.findOne({
    where: {
      userUuid: payload['uuid'],
      refreshToken,
    },
  });

  if ( ! result) {
    throw new UnauthorizedError('Пользователь не авторизован');
  }

  const today = Date.now();
  const currentIP = ctx['ips'].length > 0 ? ctx['ips'][ctx['ips'].length - 1] : ctx['ip'];
  const data = result.toJSON();

  if (data['ip'] !== currentIP) {
    throw new UnauthorizedError('Конфликт IP адреса');
  }

  if (data['userAgent'] !== ctx['userAgent']['source']) {
    throw new UnauthorizedError('Конфликт user agent');
  }

  if (Number(today) >= Number(data['expiresIn'])) {
    throw new UnauthorizedError('Пользователь не авторизован. Токен отозван');
  }

  // обновляем токен
  const expirationTime = Number(today + Number(process.env['JWT_EXP'] * 60 * 1000));
  const expirationFullTime = Number(today + Number(process.env['JWT_EXP_END'] * 24 * 60 * 1000));
  const newRefreshToken = token(today + process.env['JWT_SECRET']).digest('hex');

  await RefreshToken.update({
    refreshToken: newRefreshToken,
    expiresIn: expirationFullTime,
  }, {
    where: {
      userUuid: data['userUuid'],
    },
  });

  const newPayload = {
    ...payload,
    exp: parseInt(String(expirationTime / 1000), 10),
  };

  const newAccessToken = sign(newPayload, process.env['JWT_SECRET'], {
    algorithm:  "HS256"
  });


  ctx.status = 200;
  ctx.body = {
    success: true,
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  };
};
