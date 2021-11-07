
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
    console.error('Service worker', error);
    return false;
  }
}

export async function unsubscribeUser() {
  try {
    const subscription = serviceWorkerRegistration.pushManager.getSubscription();
    const subscriptionData = {
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

    return await subscription.unsubscribe();
  }
  catch(error) {
    console.error('Service worker', error);
    return null;
  }
}

export async function registerServiceWorker() {
  try {
    await navigator.serviceWorker.register('./push-notification.js')
    serviceWorkerRegistration = await navigator.serviceWorker.ready;
  }
  catch(error) {
    console.error('Service worker', error);
  }
}

export async function checkSubscription() {
  try {
    const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
    return ! (subscription === null);
  }
  catch(error) {
    console.error('Service worker', error);
    return false;
  }
}

export function checkServiceWorker() {
  return ('serviceWorker' in navigator);
}
