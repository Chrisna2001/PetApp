import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Logo from '../assets/images/login.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from './utils/ApiService';

const Login = ({navigation}) => {
  console.log('welcome');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { fetchData, loading, data } = useMutation();
  
  const handleSubmit = async () => {
    console.log('welcome--------------->', username, password);
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      const loginData = {
        username: username,
        password: password,
      };
      
      const result = await fetchData({
        endpoint: 'auth/Login',
        method: 'POST',
        data: loginData
      });
      
      console.log("Login result:", result);
      
      // Save username to AsyncStorage for persistence
      await AsyncStorage.setItem('username', username);
      
      // Navigate to Home with username in params
      navigation.navigate('Home', { username });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Please check your credentials.');
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

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'gray'}}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={username}
          onChangeText={setUsername}
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
          onChangeText={setPassword}
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
          onPress={handleSubmit}
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
            {loading ? 'Logging in...' : 'Login'}
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