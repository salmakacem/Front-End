importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

  firebase.initializeApp({
    apiKey: "AIzaSyB8djvaircxX1lHIz4GsgVEhrz91O5mBzA",
    authDomain: "association-e5180.firebaseapp.com",
    projectId: "association-e5180",
    storageBucket: "association-e5180.appspot.com",
    messagingSenderId: "540102029731",
    appId: "1:540102029731:web:76cb86a512bba48f442a16",
    measurementId: "G-PEE2SP08LV"
});

const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
 
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: '/firebase-logo.png',
      data: payload.data
    };
 
    return self.registration.showNotification(notificationTitle,notificationOptions);
  });
 
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
 
    let navigateUrl = event.notification.data.click_action;
 
    event.waitUntil(
      clients.openWindow(navigateUrl)
    );
  });

