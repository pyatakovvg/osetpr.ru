
self.addEventListener('push', function(event) {
  let notificationData = {};

  try {
    notificationData = event.data.json();
  }
  catch(e) {
    notificationData = {
      title: 'Пекарня "Осетинские прироги"',
      body: 'Default message',
      icon: '/favicon.svg',
    };
  }

  event.waitUntil(
    self.registration.showNotification(notificationData['title'], {
      body: notificationData['body'],
      icon: notificationData['icon'],
      image: notificationData['image'],
    })
  );
});

self.addEventListener('notificationclick', function(event) {

  // close the notification
  event.notification.close();

  // see if the current is open and if it is focus it
  // otherwise open new tab
  event.waitUntil(

    self.clients.matchAll().then(function(clientList) {

      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      return self.clients.openWindow('/');
    })
  );
});