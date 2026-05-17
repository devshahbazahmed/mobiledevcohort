import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DocsDynamicPage = () => {
  const { slug } = useLocalSearchParams();
  return (
    <View>
      <Text>DocsDynamicPage {Array.isArray(slug) ? slug.join('/') : slug}</Text>
    </View>
  );
};

export default DocsDynamicPage;

const styles = StyleSheet.create({});
