import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerStyle: {
          backgroundColor: '#111827',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
        },
      },
    },
  },
  Details: DetailsScreen,
  Profile: ProfileScreen,
});

const Navigation = createStaticNavigation(Stack);

export default function StaticStackNavigator() {
  return <Navigation />;
}
