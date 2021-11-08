
// import logger from '@sys.packages/logger';
// import request from "@sys.packages/request";
//
// import builderData from './builder/order.mjs';
//
//
import { models } from "@sys.packages/db";

import webPush from "web-push";

export default async (data) => {
  const { Subscription } = models;

  const result = await Subscription.findOne({
    where: {
      userUuid: data['userUuid'],
    },
  });

  if ( ! result) {
    return void 0;
  }

  const item = result.toJSON();
  const subscription = {
    endpoint: item['endpoint'],
    keys: {
      auth: item['auth'],
      p256dh: item['p256dh'],
    },
  };

  let message = '';
  if (data['status']['code'] === 'new') {
    message = 'Заказ оформлен';
  }
  else if (data['status']['code'] === 'confirmed') {
    message = 'Заказ подтвержден';
  }
  else if (data['status']['code'] === 'canceled') {
    message = 'Заказ отменен';
  }
  else if (data['status']['code'] === 'process') {
    message = 'Заказ готовится';
  }
  else if (data['status']['code'] === 'done') {
    message = 'Заказ готов';
  }
  else if (data['status']['code'] === 'finished') {
    message = 'Заказ выполнен! Приятного аппетита!';
  }

  const payload = JSON.stringify({
    title: 'Статус заказа',
    body: message,
    icon: '/favicon.ico',
  });

  const options = {
    TTL: 3600 // 1sec * 60 * 60 = 1h
  };

  await webPush.sendNotification(subscription, payload, options);




//   const { data: user } = await request({
//     url: process.env['IDENTITY_API_SRV'] + '/users',
//     method: 'get',
//     params: {
//       uuid: data['userUuid'],
//     },
//   });
//
//   const { data: admins } = await request({
//     url: process.env['IDENTITY_API_SRV'] + '/users',
//     method: 'get',
//     params: {
//       role: 'admin',
//     },
//   });
//
//   const resp = [];
//
//   if ( !! user.length) {
//     resp.push(user[0]['login']);
//   }
//
//   if ( !! admins.length) {
//     admins.forEach((admin) => {
//       resp.push(admin['login']);
//     });
//   }
//
}
