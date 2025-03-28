import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const BuyorSell = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose an Option</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Adoption')} style={styles.imageButton}>
        <Image source={require('../assets/images/img/petadopt.jpg')} style={styles.image} />
        <Text style={styles.buttonText}>Adoption</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Adoption')} style={styles.imageButton}>
        <Image source={require('../assets/images/img/adoption.jpg')} style={styles.image} />
        <Text style={styles.buttonText}>Sale</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    borderWidth: 2, 
    borderColor: 'orange', 
   
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
});

export default BuyorSell;
