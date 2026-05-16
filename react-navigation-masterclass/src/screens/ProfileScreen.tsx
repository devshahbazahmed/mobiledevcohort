import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button onPress={() => navigation.popToTop()}>Go to home</Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

// 1. navigate() -> Go to a screen by name
// 2. goBack() -> Go to prev screen
// 3. push() -> Adds a new instance
// 4. replace("") ->
// 5. popToTop() -> Go back to first screen
// 6. popTo("") ->
