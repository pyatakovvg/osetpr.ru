
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

  const externalId = data['externalId'].toUpperCase().replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');

  let message = '';
  if (data['status']['code'] === 'new') {
    message = 'Оформлен заказ #' + externalId + ' на сумму ' + data['total'] + data['currency']['displayName'];
  }
  else if (data['status']['code'] === 'confirmed') {
    message = 'Заказ #' + externalId + 'на сумма ' + data['total'] + data['currency']['displayName'] + ' подтвержден';
  }
  else if (data['status']['code'] === 'canceled') {
    message = 'Заказ #' + externalId + ' отменен';
  }
  else if (data['status']['code'] === 'process') {
    message = 'Заказ #' + externalId + ' готовится';
  }
  else if (data['status']['code'] === 'done') {
    message = 'Заказ #' + externalId + ' готов';
  }
  else if (data['status']['code'] === 'finished') {
    message = 'Заказ #' + externalId + ' выполнен! Приятного аппетита!';
  }

  const payload = JSON.stringify({
    body: message,
    icon: '/icon-48.png',
    image: '/icon-96.png',
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
