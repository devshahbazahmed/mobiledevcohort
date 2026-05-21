import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.nav}>
      <Text style={styles.logo}>Notes</Text>
      <Pressable>
        <Fontisto name="search" size={24} color="#4648D4" />
      </Pressable>
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
    backgroundColor: '#F8F9FF',
    height: 64,
  },
  logo: {
    fontWeight: 800,
    fontSize: 30,
    color: '#0B1C30',
  },
});
