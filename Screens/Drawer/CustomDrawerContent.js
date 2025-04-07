// CustomDrawerContent.js
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    // Add your logout logic here
    props.navigation.replace('Login'); // if you have a login screen
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/img/cat5.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>CHRISNA</Text>
      </View>
      <DrawerItem
        label="Profile"
        icon={({color, size}) => (
          <MaterialIcons name="person" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Settings"
        icon={({color, size}) => (
          <MaterialIcons name="settings" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label="Pet Details"
        icon={({color, size}) => (
          <MaterialIcons name="pets" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate('PetDetails')}
      />
      <DrawerItem
        label="Logout"
        icon={({color, size}) => (
          <MaterialIcons name="logout" size={size} color={color} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
