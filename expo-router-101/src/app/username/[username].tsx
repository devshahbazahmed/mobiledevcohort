import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserNameDetails = () => {
  const { username } = useLocalSearchParams();
  return (
    <View>
      <Text>{username}</Text>
    </View>
  );
};

export default UserNameDetails;

const styles = StyleSheet.create({});
