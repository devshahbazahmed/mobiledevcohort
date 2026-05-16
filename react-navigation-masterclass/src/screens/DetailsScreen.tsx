import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Link, useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { username } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Details',
    });
  }, [navigation]);
  return (
    <View>
      <Text>{username}</Text>
      <Button title={'Go back'} onPress={() => navigation.replace('Profile')} />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
