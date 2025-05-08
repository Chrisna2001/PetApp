import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../assets/images/login.svg';
import * as Keychain from 'react-native-keychain';
import { getAuthToken } from './utils/ApiService';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const verification = async ()=>{
      const token = await getAuthToken();
      if(token){
        setTimeout(()=>navigation.navigate('Home'),5000);
      }else{
        setTimeout(()=>navigation.navigate('Register'),5000)
      }
    };
    verification();
  });

 

  console.log('reached here...................');

  const confirm = async () => {
    const token = await Keychain.getGenericPassword();
    if (token) {
      navigation.navigate('SkipPage');
    } else {
      navigation.navigate('SkipPage');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Logo width={250} height={250} />
      </View>
      <Text style={[styles.text, {color: 'orange'}]}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
