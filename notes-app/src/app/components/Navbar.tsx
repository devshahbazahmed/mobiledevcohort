import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, systemScheme, manualDark, setManualDark } = useTheme();
  return (
    <View style={[styles.nav, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.logo, { color: theme.colors.text }]}>Notes</Text>
      <Switch
        value={manualDark ?? systemScheme === 'dark'}
        onValueChange={setManualDark}
        trackColor={{ false: '#ddd', true: theme.colors.text }}
        thumbColor="white"
        style={styles.toggle}
      />
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    paddingInline: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  logo: {
    fontWeight: 800,
    fontSize: 30,
  },
  toggle: {
    marginTop: 20,
  },
});
