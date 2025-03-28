import React, {useState} from 'react';

import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Logo from '../assets/images/login.svg';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';
import * as Keychain from 'react-native-keychain';

const Login = ({navigation}) => {
  console.log('welcome');

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  
  console.log('erorr------> 1')
  const handleSubmit = async () => {
    console.log('welcome--------------->', username, password);
    try {
      const response = await axios.post(
        ` ${API_URL}auth/login`,
        {
          userName: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(response.data);
      tokenauth(response.data.authToken);
    } catch (error) {
      console.error('Error:', error);
    }

    
  };

  const tokenauth = async recievedtoken => {
    const token = recievedtoken;
    await Keychain.setGenericPassword('keyToken', token);
    try {
      const credentials = await Keychain.getGenericPassword();
      console.log('reached here-------------3--------------', credentials);
      if (credentials) {
        console.log('succesfully retrieved' + credentials.password);
        navigation.navigate('Create_ac');
      } else {
        console.log('no credential is stored');
      }
    } catch (error) {
      console.error('failed ', error);
    }

    // await Keychain.resetGenericPassword();
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
      <View
        style={{
          position: 'absolute',
          top: 50,
          alignSelf: 'center',
        }}>
        <Logo width={120} height={120} />
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 180,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '60%',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              borderBottomWidth: 2,
              borderBottomColor: 'orange',
              paddingBottom: 5,
            }}>
            Login
          </Text>

          <TouchableOpacity onPress={handleSubmit}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'gray'}}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={username}
          onChangeText={setusername}
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
          value={password}
          onChangeText={setpassword}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: 'orange',
              fontSize: 14,
              marginBottom: 20,
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSubmit()}
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
            Login
          </Text>
        </TouchableOpacity>

        <Text style={{fontSize: 16, color: 'gray', marginVertical: 10}}>
          or
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'orange',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#eee',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: 'black'}}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
