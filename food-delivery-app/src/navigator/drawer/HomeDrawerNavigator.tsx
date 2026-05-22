import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from '../tabs/TabNavigator';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '75%',
        },
      }}
    >
      <Drawer.Screen
        name="TabsNavigator"
        component={TabNavigator}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
