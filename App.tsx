import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login';
import Register from './Screens/Register';
import SplashScreen from './Screens/SplashScreen';
import phonenum from './Screens/phonenum';  
import otp from './Screens/otp';
import Create_ac from './Screens/Create_ac';
import ForgotPassword from './Screens/ForgotPassword';
import Resetpassword from './Screens/Resetpassword';
import BottomTabNav from './Screens/BottomNavigation/BottomTabNavigator';
import Adoption from './Screens/Features/Adoption';
import Adopt_petdetails from './Screens/Adopt_petdetails';
import BuyorSell from './Screens/BuyorSell';
import SkipPage from './Screens/SkipPage';
import Petpro from './Screens/Petpro';
import PetDisplay from './Screens/PetDisplay';
import PetSell from './Screens/Features/PetSell'
import Grooming from './Screens/Features/Grooming';
import CustomDrawerContent from './Screens/Drawer/CustomDrawerContent'
import AppNavigator from './Screens/Drawer/AppNavigator';
import PetMissing from './Screens/Features/PetMissing';
import PetEvent from './Screens/Features/PetEvent';
import DrawerHome from './Screens/Features/DrawerHome';
import DrawerNavigator from './Screens/Drawer/DrawerNavigator';
import Eventdisplay from './Screens/Eventdisplay';
import ShopDetails from './Screens/ShopDisplay';
import AppointmentPage from './Screens/AppointmentPage';
import Viewappoinments from './Screens/Viewappoinments'





const Stack = createStackNavigator();

const App = () => {
  console.log("welcome to techtaliya");
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="phonenum" component={phonenum} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="otp" component={otp} />
        <Stack.Screen name="Create_ac" component={Create_ac} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Resetpassword" component={Resetpassword} />
        <Stack.Screen name="Home" component={BottomTabNav} />
        <Stack.Screen name="Adoption" component={Adoption} />
        <Stack.Screen name="Adopt_petdetails" component={Adopt_petdetails} />
        <Stack.Screen name="BuyorSell" component={BuyorSell} />
        <Stack.Screen name="SkipPage" component={SkipPage} />
        <Stack.Screen name="Petpro" component={Petpro} />
        <Stack.Screen name="PetDisplay" component={PetDisplay} />
        <Stack.Screen name="PetSell" component={PetSell} />
        <Stack.Screen name="Grooming" component={Grooming} />
        <Stack.Screen name=" AppNavigator" component={ AppNavigator} />
        <Stack.Screen name='PetMissing' component={PetMissing} />
        <Stack.Screen name='Eventdisplay' component={Eventdisplay} />
        <Stack.Screen name='ShopDetails' component={ShopDetails} />
        <Stack.Screen name='AppointmentPage' component={AppointmentPage} />
        <Stack.Screen name='Viewappoinments' component={Viewappoinments} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
