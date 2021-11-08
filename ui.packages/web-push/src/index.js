
import { UnavailableError } from '@packages/errors';
import request from '@ui.packages/request';


let serviceWorkerRegistration = null;
const appServerKey = process.env['REACT_APP_PUSH_PUBLIC_KYE'];


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


export async function subscribeUser(userUuid) {
  try {
    console.log('WePush: SW unsubscribe user');

    if ( ! serviceWorkerRegistration) {
      throw new Error('SW not registered');
    }

    const subscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(appServerKey),
    })
    const subscriptionData = subscription.toJSON();

    await request({
      url: '/push/subscribe',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        userUuid,
        ...subscriptionData,
      }),
    });

    return true;
  }
  catch(error) {
    throw new UnavailableError({ code: '0.0.2', message: error['message'] })
  }
}

export async function unsubscribeUser(userUuid) {
  try {
    console.log('WePush: SW subscribe user');

    if ( ! serviceWorkerRegistration) {
      throw new Error('SW not registered');
    }

    const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
    const subscriptionData = {
      userUuid,
      endpoint: subscription['endpoint'],
    };

    await request({
      url: '/push/unsubscribe',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(subscriptionData),
    });

    await subscription.unsubscribe();
  }
  catch(error) {
    throw new UnavailableError({ code: '0.0.2', message: error['message'] })
  }
}

export async function registerServiceWorker() {
  try {
    console.log('WePush: SW file\'s worker register');
    await navigator.serviceWorker.register('push-notification.js', {
      scope: process.env['PUBLIC_URL'],
    })
    serviceWorkerRegistration = await navigator.serviceWorker.ready;
    console.log('WePush: SW file\'s worker was registered');
  }
  catch(error) {
    console.error('WePush error: ', error);
  }
}

export async function checkSubscription() {
  try {
    if ( ! serviceWorkerRegistration) {
      throw new Error('Воркер не установлен');
    }
    console.log('WePush: SW subscribe checking');
    const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
    return ! (subscription === null);
  }
  catch(error) {
    throw new UnavailableError({ code: '0.0.2', message: error['message'] })
  }
}

export function checkServiceWorker() {
  console.log('WePush: SW support checking');
  return ('serviceWorker' in navigator);
}
