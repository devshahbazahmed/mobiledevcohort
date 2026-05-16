import * as React from 'react';
import { View, Text } from 'react-native';
import StaticDrawer from './src/navigator/drawer/StaticDrawer';
import DynamicDrawer from './src/navigator/drawer/DynamicDrawer';

export default function App() {
  return <DynamicDrawer />;
}
