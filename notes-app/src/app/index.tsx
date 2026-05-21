import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './screens/Home';
import { themeTypes } from './types/themeTypes';

const themes: themeTypes = {
  light: {
    background: '#C7C4D7',
    card: '#FFFFFF',
    text: '#0B1C30',
    placeholderText: '#464554',
  },
  dark: {
    background: '#0B1C30',
    card: '#213145',
    text: '#F8F9FF',
    titleText: '#494BD6',
    placeholderText: '#6B7280',
  },
};

export default function Index() {
  const systemScheme = useColorScheme();
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  const isDark = manualDark !== null ? manualDark : systemScheme === 'dark';
  const toggleManualDark = () =>
    setManualDark((prev) => (prev === null ? !isDark : !prev));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView>
        <StatusBar style={manualDark ? 'light' : 'dark'} />
        <Home
          themes={themes}
          isDark={isDark}
          manualDark={manualDark}
          setManualDark={toggleManualDark}
          systemScheme={systemScheme}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
