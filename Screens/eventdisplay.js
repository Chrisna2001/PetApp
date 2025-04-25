import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const eventdisplay = () => {
  return (
    <View style={styles.container}>
      {/* Square Image */}
      <Image
        source={require('../assets/images/img/event8.jpg')} // Local image
        style={styles.image}
      />

      {/* Event Details */}
      <View style={styles.details}>
        <Text style={styles.title}>FirstBisa Event</Text>
        <Text style={styles.text}>📅 Date: April 25, 2025</Text>
        <Text style={styles.text}>💰 Price: ₹500</Text>
        <Text style={styles.text}>📝 Registration Fee: ₹50</Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  details: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default eventdisplay;
