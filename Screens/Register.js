import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Logo from '../assets/images/login.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from './utils/ApiService';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {fetchData, loading, data} = useMutation();

  const handleSubmit = async () => {
    if (
      !name ||
      !username ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const registerData = {
        name: name,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        role: 'user',
      };
      
      console.log(registerData);
      
      // Save user data to AsyncStorage (for profile page)
      await AsyncStorage.setItem('userProfile', JSON.stringify({
        name: name,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        role: 'user',
      }));
      
      // Also store the username separately for the home page welcome message
      await AsyncStorage.setItem('username', username);
      
      // API call to register
      const result = await fetchData({
        endpoint: 'auth/register',
        method: 'POST',
        data: registerData,
      });
      
      console.log('Registration response:', result);
      
      // Show success message and navigate to login
      Alert.alert(
        'Registration Successful',
        'Your account has been created! Please login.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
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
          width: 100,
          height: 100,
          marginBottom: 20,
        }}>
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
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
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
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
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
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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
        value={phoneNumber}
        onChangeText={setPhoneNumber}
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
        value={password}
        onChangeText={setPassword}
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
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

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
        onPress={handleSubmit}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
          {loading ? 'Registering...' : 'Register'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 15}}>
        <Text style={{color: 'orange', fontSize: 16}}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;