import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../assets/images/login.svg';
import * as Keychain from 'react-native-keychain';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(confirm, 5000);
  }, []);

  console.log('reached here...................');

  const confirm = async () => {
    const token = await Keychain.getGenericPassword();
    if (token) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
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
