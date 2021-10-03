import {token} from "@sys.packages/utils";
import {sign} from "@sys.packages/jwt";
import {models} from "@sys.packages/db";

export default async function(ctx, data) {
  const { RefreshToken } = models;

  const today = Date.now();
  const expirationTime = Number(today + Number(process.env['JWT_EXP'] * 60 * 1000));
  const expirationFullTime = Number(today + Number(process.env['JWT_EXP_END'] * 24 * 60 * 1000));
  const refreshToken = token(today + process.env['JWT_SECRET']).digest('hex');

  const currentIP = ctx['ips'].length > 0 ? ctx['ips'][ctx['ips'].length - 1] : ctx['ip'];

  await RefreshToken.create({
    userUuid: data['uuid'],
    refreshToken: refreshToken,
    userAgent: ctx['userAgent']['source'],
    ip: currentIP,
    expiresIn: expirationFullTime,
  });

  // организуем авторизационный объект
  const payload = {
    uuid: data['uuid'],
    role: data['role']['code'],
    permissions: [],
    exp: parseInt(String(expirationTime / 1000), 10),
  };

  const identityToken = sign(payload, process.env['JWT_SECRET']);

  return {
    accessToken: identityToken,
    refreshToken: refreshToken,
  }
};
