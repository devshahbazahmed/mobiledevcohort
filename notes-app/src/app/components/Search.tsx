import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Search = () => {
  const [value, setValue] = useState<string>('');
  return (
    <View style={styles.searchbar}>
      <TextInput
        placeholder="Search"
        style={styles.input}
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
  );
};

export default Search;

const styles = StyleSheet.create({
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
