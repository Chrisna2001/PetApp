// AppNavigator.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawerContent from './CustomDrawerContent';

import DrawerHome from '../Features/DrawerHome';



const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="DrawerHome" component={DrawerHome} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
