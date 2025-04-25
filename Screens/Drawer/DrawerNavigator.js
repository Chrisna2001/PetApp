// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerHome from '../Features/DrawerHome';
// import other screens here

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name=" DrawerHome" component={ DrawerHome} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
}
