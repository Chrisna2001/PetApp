import React, {useState} from 'react';
import * as Keychain from 'react-native-keychain';

import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import Toast from 'react-native-toast-message';

const Phonenum = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  console.log(API_URL);
  console.log('erorrrrr')
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}users/login`,
        {
          phoneNumber: phoneNumber,
          role:'user'
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data)

      

      navigation.navigate('otp', {
        phone: phoneNumber,
        otp: response.data.otp,
      });
      // Alert.alert('Success', 'Data posted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetOtp = () => {
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }
    navigation.navigate('otp', {phone: phoneNumber});
  };
  

 

  return (
    <View style={styles.container}>
      <Toast />
      <Text style={styles.title}>Enter Your Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit();
        }}>
        <Text style={styles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Phonenum;
