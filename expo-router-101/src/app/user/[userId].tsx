import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserIdDetails = () => {
  const { userId } = useLocalSearchParams();
  return (
    <View>
      <Text>{userId}</Text>
    </View>
  );
};

export default UserIdDetails;

const styles = StyleSheet.create({});
