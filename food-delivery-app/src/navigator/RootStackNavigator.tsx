import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import CartScreen from '../screens/CartScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeDrawerNavigator from './drawer/HomeDrawerNavigator';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeDrawerNavigator} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
