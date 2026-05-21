import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import {
  ColorSchemeName,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { themeTypes } from '../types/themeTypes';

const Home = ({
  themes,
  isDark,
  manualDark,
  setManualDark,
  systemScheme,
}: {
  themes: themeTypes;
  isDark: boolean;
  manualDark: boolean | null;
  setManualDark: () => void;
  systemScheme: ColorSchemeName;
}) => {
  const [value, setValue] = useState<string>('');

  const theme = isDark ? themes.dark : themes.light;

  return (
    <>
      {/* Navbar */}
      <View style={[styles.nav, { backgroundColor: theme.background }]}>
        <Text style={[styles.logo, { color: theme.text }]}>Notes</Text>
        <Switch
          thumbColor="white"
          value={manualDark ?? systemScheme === 'dark'}
          onValueChange={setManualDark}
        />
      </View>

      {/* Searchbar */}
      <View style={[styles.searchbar, { backgroundColor: theme.background }]}>
        <TextInput
          placeholder="Search"
          style={[
            styles.input,
            { backgroundColor: theme.card, color: theme.text },
          ]}
          value={value}
          onChangeText={setValue}
          placeholderTextColor="#464554"
          editable={true}
        />
        <Fontisto
          name="search"
          size={24}
          color="#464554"
          style={{
            position: 'absolute',
            left: '8%',
            bottom: '35%',
          }}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  nav: {
    paddingInline: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    height: 64,
  },
  logo: {
    fontWeight: 800,
    fontSize: 30,
    color: '#0B1C30',
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#464554',
    fontSize: 15,
    height: 60,
    borderWidth: 1,
    marginBlock: 20,
    paddingLeft: 50,
    paddingBlock: 14,
    borderColor: '#C7C4D7',
    borderRadius: 50,
    marginInline: 15,
    backgroundColor: '#EFF4FF',
    width: '90%',
    position: 'relative',
  },
});
