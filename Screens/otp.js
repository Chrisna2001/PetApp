import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const Otp = ({navigation,route}) => {

  const {phone, otp} = route.params;
  console.log("bmbjmhhkjhkjb")
  console.log("mnn",phone)
  // console.log("mnn",receivedOTP)

  const [receivedOTP, setreceivedOTP] = useState('');


  useEffect(() => {
    setreceivedOTP(otp);
    Toast.show({
      type: 'success',
      text1: 'Response OTP: ' + otp,
    });
  }, [receivedOTP]);

  console.log(receivedOTP);



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Toast />
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 10,
        }}>
        Enter <Text style={{color: 'orange'}}>6</Text> Digit OTP
      </Text>

      <Text
        style={{
          fontSize: 14,
          color: 'gray',
          marginBottom: 20,
          textAlign: 'center',
        }}>
        Enter the OTP code from the phone you just received.
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginBottom: 20,
        }}>
        <TextInput
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          color={'black'}
        />
        <TextInput
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          color={'black'}
        />
        <TextInput
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          color={'black'}
        />
        <TextInput
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          color={'black'}
        />
        <TextInput
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          color={'black'}
        />
        <TextInput
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          color={'black'}
        />
      </View>

      <Text style={{fontSize: 14, color: 'gray', marginBottom: 20}}>
        Didn't receive OTP Code?{' '}
        <Text style={{fontWeight: 'bold', color: 'orange'}}>Resend</Text>
      </Text>

      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          backgroundColor: 'orange',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate('Resetpassword',{OTP:receivedOTP,number:phone})}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
  },
};

export default Otp;
