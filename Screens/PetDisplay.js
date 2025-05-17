// App.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, Platform, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from "react-native-push-notification";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // Create notification channel (Android)
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // must match channelId in notifications
        channelName: "Default Channel",
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    // Configure notification handler
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("Notification received:", notification);
      },
      requestPermissions: Platform.OS === "ios",
    });
  }, []);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const scheduleNotification = (date, message) => {
    PushNotification.localNotificationSchedule({
      channelId: "default-channel-id",
      title: "Reminder",
      message: message,
      date: date,
      allowWhileIdle: true,
    });
  };

  const onSetReminder = () => {
    if (date <= new Date()) {
      Alert.alert("Invalid Date", "Please select a future date and time");
      return;
    }
    scheduleNotification(date, "This is your reminder!");
    Alert.alert(
      "Reminder Set",
      `Notification scheduled for ${date.toLocaleString()}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set a Notification Reminder</Text>
      <View style={{ marginVertical: 20 }}>
        <Button title="Pick Date & Time" onPress={() => setShowPicker(true)} />
      </View>

      <Text style={{ fontSize: 16 }}>
        Selected: {date.toLocaleString()}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

      <View style={{ marginTop: 40 }}>
        <Button title="Set Reminder" onPress={onSetReminder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
