import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href={'/about'}>About</Link>
      <Link href={'/profile'}>Profile</Link>
      <Link href={'/profile/details'}>Profile-Details</Link>
      <Link href={'/user/12345'}>UserIdDetails</Link>
      <Link href={'/username/suraj'}>UserNameDetails</Link>
      <Link href={'/docs/expo-router/introduction'}>Topicname</Link>
      <Link href={'/login'}>Login</Link>
      <Link href={'/signup'}>Signup</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
