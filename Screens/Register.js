import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Logo from '../assets/images/login.svg';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const Register = ({ navigation }) => {
  const [Username, setUsername] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  console.log("Register")
  const handleSubmit = async () => {
    if (!Username || !PhoneNumber || !Password || !ConfirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (Password !== ConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    console.log("Registering")
    console.log(Username);
    console.log(PhoneNumber);
    console.log(Password);
    console.log(ConfirmPassword);


    try {
      console.log(ConfirmPassword);
      const response = await axios.post(
        `${API_URL}auth/register`, 
        {
          userName: Username,
          phoneNumber: PhoneNumber,
          password: Password,
          confirmPassword: ConfirmPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('OTP:', response.data.otp);
      // Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error:', error);
      // Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          marginBottom: 20,
        }}
      >
        <Logo width={120} height={120} />
      </View>

      <TextInput
        style={{
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          marginBottom: 15,
          backgroundColor: '#f9f9f9',
          color: 'black',
        }}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={Username}
        onChangeText={setUsername}
      />

      <TextInput
        style={{
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          marginBottom: 15,
          backgroundColor: '#f9f9f9',
          color: 'black',
        }}
        placeholder="Phone Number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        maxLength={10}
        value={PhoneNumber}
        onChangeText={setPhoneNumber} // Fixed onChange
      />

      <TextInput
        style={{
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          marginBottom: 15,
          backgroundColor: '#f9f9f9',
          color: 'black',
        }}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={Password}
        onChangeText={setPassword} // Fixed onChange
      />

      <TextInput
        style={{
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          marginBottom: 15,
          backgroundColor: '#f9f9f9',
          color: 'black',
        }}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={ConfirmPassword}
        onChangeText={setConfirmPassword} // Fixed onChange
      />

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset instructions sent to your email')}>
        <Text
          style={{
            alignSelf: 'flex-start',
            color: 'orange',
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'orange',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
