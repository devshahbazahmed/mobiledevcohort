import * as React from 'react';
import { View, Text } from 'react-native';
import StaticStackNavigator from './src/navigator/stack/StaticStackNavigator';
import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';
import DynamicTabsNavigator from './src/navigator/tabs/DynamicTabsNavigator';

export default function App() {
  return <DynamicTabsNavigator />;
}
