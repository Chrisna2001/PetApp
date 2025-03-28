import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {API_URL} from 'react-native-dotenv';

const ForgotPassword = ({navigation}) => {
  const [phonenumber, setphonenumber] = useState('');

  // const handlePasswordReset = () => {
  //   if (!email) {
  //     Alert.alert('Error', 'mobile number.');
  //     return;
  //   }

  //   Alert.alert('Success', 'otp send your phonenumber.');
  // };

  ///forgotpassword
  const handleForgotpassword = async () => {
    console.log('forgot');

    try {
      const response = await axios.post(
        `${API_URL}auth/forgot-password`,
        {
          phoneNumber: phonenumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log("response")
      console.log(response.data.otp);
      navigation.navigate('otp', {phone: phonenumber, otp: response.data.otp});
    } catch (error) {
      console.error('Error:', error);
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
      }}>
      <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>
        Forgot Password
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: 'gray',
          marginBottom: 20,
          textAlign: 'center',
        }}>
        Enter mobile number
      </Text>

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
        }}
        maxLength={10}
        placeholder="Mobile Number"
        placeholderTextColor="#aaa"
        value={phonenumber}
        onChangeText={setphonenumber}
      />

      <TouchableOpacity
        onPress={() => handleForgotpassword()}
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'orange',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
          Reset Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{fontSize: 16, color: 'gray', marginTop: 20}}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
