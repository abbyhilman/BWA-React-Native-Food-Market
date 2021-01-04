import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    bigText: message,
    autoCancel: true,
    // color: 'red',
    // vibrate: true,
    // vibration: 300,
  });
};

const handleSchedulNotification = (title, message) => {
  PushNotification.localNotificationSchedule({
    date: new Date(Date.now() + 5 * 1000),
    ticker: title,
    subText: message,
    autoCancel: true,
    color: 'red',
    vibrate: true,
    vibration: 300,
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {showNotification, handleSchedulNotification, handleCancel};
