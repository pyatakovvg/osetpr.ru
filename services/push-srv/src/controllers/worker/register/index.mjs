
import { models } from '@sys.packages/db';

import webPush from 'web-push';


export default () => async (ctx) => {
  const { Subscription } = models;
  const data = ctx['request']['body'];

  await Subscription.create({
    userUuid: data['userUuid'],
    endpoint: data['endpoint'],
    auth: data['keys']['auth'],
    p256dh: data['keys']['p256dh'],
  });

  ctx.body = {
    success: true,
    data: null,
  };
};
