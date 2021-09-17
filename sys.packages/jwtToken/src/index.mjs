
import { ExpiredError, UnauthorizedError } from '@packages/errors';

import logger from "@sys.packages/logger";
import request from "@sys.packages/request";

import jwt from 'jsonwebtoken';

export const { TokenExpiredError, JsonWebTokenError } = jwt;


export function resetCookie(ctx, name) {
  ctx.cookies.set(name, null, { httpOnly: true });
}

export const getCookie = async (ctx, name) => {
  const cookies = ctx['cookie'] || {};
  const cookie = cookies[name] || null;

  if ( ! cookie) {
    logger.info('Пользовательские cookie не найдены');
    throw new UnauthorizedError({ code: '2.2.2', message: 'settings not authorize' });
  }

  logger.info('Раскодирование cookie');
  const data = JSON.parse(decodeURIComponent(cookie));

  logger.info('Cookie: ' + JSON.stringify(data));

  if ( ! data['accessToken'] || ! data['refreshToken']) {
    logger.info('Неверный формат объекта cookie');
    resetCookie(ctx, name);
    throw new UnauthorizedError({ code: '2.2.2', message: 'settings not authorize' });
  }

  return data;
};

export const checkCookie = async (url, data) => {
  const result = await request({
    url,
    method: 'post',
    data,
  });

  return {
    success: true,
    data: result['data'],
  };
};

const refreshToken = async (url, data, ctx) => {
  const result = await request({
    url,
    method: 'post',
    headers: {
      'User-Agent': ctx['request']['header']['user-agent'],
    },
    data,
  });

  return {
    success: true,
    data: result['data'],
  };
};

export const decode = (token) => {
  return jwt.decode(token, { complete: true });
}

export const verify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

export const sign = (data, secret) => {
  return jwt.sign(data, secret, {
    algorithm:  "HS384"
  });
}


export const middleware = (options) => async (ctx, next) => {
  logger.info('Получение данных cookie');
  const cookie = await getCookie(ctx, options['cookieName']);

  try {
    logger.info('Проверка авторизованного токена');
    await checkCookie(options['checkUrl'], cookie);

    logger.info('Декодирование авторизационного токена: ' + cookie['accessToken']);
    ctx.user = await verify(cookie['accessToken'], options['secret']);

    await next();
  }
  catch (error) {

    if (error instanceof UnauthorizedError) {
      resetCookie(ctx, options['cookieName']);

      throw new UnauthorizedError({ code: '2.2.2', message: 'not authorize' });
    }

    if (error instanceof ExpiredError) {
      const { data } = await refreshToken(options['refreshUrl'], cookie, ctx);

      ctx.cookies.set(options['cookieName'], encodeURIComponent(JSON.stringify(data)), {
        httpOnly: true,
      });

      return await next();
    }

    throw error;
  }
};