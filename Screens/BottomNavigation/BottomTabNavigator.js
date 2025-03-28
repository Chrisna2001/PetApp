import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Profile from './Profile';
import Cart from './cart';
import Commmunity from'./community';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Header Component
const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search..." 
        placeholderTextColor="#888" 
      />
      <Icon name="notifications" size={28} color="orange" style={styles.icon} />
    </View>
  );
};

// Home Stack Navigator
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />, 
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'left', 
        }} 
      />
    </Stack.Navigator>
  );
};

const Community = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Community" 
        component={Commmunity} 
        options={{
          headerShown: false,
          headerTitle: () => <CustomHeader />, 
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'left', 
        }} 
      />
    </Stack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />, 
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'left', 
        }} 
      />
    </Stack.Navigator>
  );
};

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Community" 
        component={Community} 
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />, 
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'left', 
        }} 
      />
    </Stack.Navigator>
  );
};

// Cart Stack Navigator
const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          headerShown: true,
          headerTitle: () => <CustomHeader />, 
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'left', 
        }} 

        
      />

      
      
    </Stack.Navigator>
  );

  
};



// Bottom Tab Navigator
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home'; 
          } else if (route.name === 'Profile') {
            iconName = 'person'; 
          } else if (route.name === 'Community') {
            iconName = 'settings'; 
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, 
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Community" component={CommunityStack} />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  headerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
    width: '100%', 
  },
  searchBar: { 
    flex: 1, 
    height: 45,
    borderWidth: 1.5, 
    borderColor: 'orange', 
    borderRadius: 15, 
    paddingLeft: 15, 
    backgroundColor: '#f9f9f9', 
    fontSize: 18, 
  },
  icon: { 
    marginLeft: 10, 
    color: "orange"
  },
});

export default BottomTabNav;
