import * as React from 'react';
import { Drawer } from 'react-native-paper';

const CustomDrawer = ({ navigation }) => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section title="Menu">
      <Drawer.Item
        label="Home"
        active={active === 'home'}
        onPress={() => {
          setActive('home');
          navigation.navigate('Home'); 
        }}
      />
      <Drawer.Item
        label="Profile"
        active={active === 'profile'}
        onPress={() => {
          setActive('profile');
          navigation.navigate('Profile');
        }}
      />
    </Drawer.Section>
  );
};

export default CustomDrawer;
