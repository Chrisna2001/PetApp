import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { API_URL } from 'react-native-dotenv';

const Resetpassword = ({ navigation,route}) => {
  // const[oTP,setOTP]=useState('')
  const[newpassword,setnewpassword]=useState('');
  const[confirmnewpassword,setconfirmnewpassword]=useState('');
  const{OTP,number}=route.params;
  // console("reset1:" ,OTP)
  // console("reset2:",number)



  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}auth/reset-password`,
        {
          phoneNumber: number,
          otp: OTP,
          newPassword: newpassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data.otp);

      navigation.navigate('Login')

      // setReceivedOtp(response.data.otp);

      // navigation.navigate('UserOtp', {
      //   phone: phone,
      //   otp: response.data.otp,
      // });
      // navigation.navigate('otp', {phonenumber: phone, otp: response.data.otp});
      // Alert.alert('Success', 'Data posted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <View style={{ padding: 20,alignItems:"center",justifyContent:"center" }}>
     
            <Text style ={{
                alignItems:"center",
                color:"orange",
                fontSize:30,
                marginBottom:10
            }}>Reaset password</Text>
       

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
        placeholder="New password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={newpassword}
        onChangeText={setnewpassword}
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
        }}
        placeholder="Confirm password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmnewpassword}
        onChangeText={setconfirmnewpassword}
      />

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          backgroundColor: 'orange',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent:"center"
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Resetpassword;
