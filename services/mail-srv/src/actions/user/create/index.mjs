
import logger from '@sys.packages/logger';
import request from "@sys.packages/request";

import nunjucks from 'nunjucks';
import nodeMailer from 'nodemailer';

import builderData from './builder/order.mjs';


export default async (data) => {
  const { data: user } = await request({
    url: process.env['IDENTITY_API_SRV'] + '/users',
    method: 'get',
    params: {
      uuid: data['uuid'],
    },
  });

  const transporter = nodeMailer.createTransport({
    host: process.env['EMAIL_HOST'],
    port: Number(process.env['EMAIL_PORT']),
    ssl: true,
    tls: false,
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASSWORD'],
    }
  });

  const html = nunjucks.render('user/create/index.html', {
    domain: process.env['DOMAIN'],
    ...user[0],
  });

  const info = await transporter.sendMail({
    from: "osetpr.ru " + process.env['EMAIL_USER'],
    to: user[0]['login'],
    subject: `Успешная регистрация на osetpr.ru`,
    html,
    date: new Date(),
  });

  logger['info'](info);
}
