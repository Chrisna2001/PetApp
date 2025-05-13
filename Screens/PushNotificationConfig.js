// PushNotificationConfig.js
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: "pet-care", 
    channelName: "Pet Care Notifications",
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);
