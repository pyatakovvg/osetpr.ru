
import webPush from 'web-push';


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const subscription = {
    endpoint: data['endpoint'],
    keys: {
      p256dh: data['keys']['p256dh'],
      auth: data['keys']['auth'],
    }
  };

  const payload = JSON.stringify({
    title: 'Добро пожаловать!',
    body: 'Теперь вы сможите получать сообщения о статусе вашего заказа ',
    icon: 'http://localhost:4000/gallery/1e88bfbf-c71c-45d8-9be5-2d3c708366f3.jpg?size=small'
  });

  const options = {
    TTL: 3600 // 1sec * 60 * 60 = 1h
  };

  await webPush.sendNotification(subscription, payload, options);

  ctx.body = {
    success: true,
    data: null,
  };
};
