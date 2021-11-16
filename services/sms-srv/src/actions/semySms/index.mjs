
import { BadRequestError } from '@packages/errors';

import request from '@sys.packages/request';


export default async (data) => {
  if ( ! data['phone']) {
    throw new BadRequestError({ code: '7.9.9', message: 'Телефон для отправки не указан' });
  }

  if ( ! data['message']) {
    throw new BadRequestError({ code: '7.8.9', message: 'Сообщение для отправки не указано' });
  }

  await request({
    url: process.env['HOST'],
    method: 'post',
    params: {
      token: process.env['TOKEN'],
      device: process.env['DEVICE'],
      phone: data['phone'],
      msg: data['message'],
    },
  });
}
