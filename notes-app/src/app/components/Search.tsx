import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Search = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.searchbar, { backgroundColor: theme.colors.background }]}
    >
      <TextInput
        placeholder="Search"
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          },
        ]}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#464554"
        editable={true}
      />
      <Fontisto
        name="search"
        size={24}
        color={theme.colors.text}
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
    fontSize: 15,
    height: 60,
    borderWidth: 1,
    marginBlock: 20,
    paddingLeft: 50,
    paddingBlock: 14,
    borderColor: '#C7C4D7',
    borderRadius: 50,
    marginInline: 15,
    width: '90%',
    position: 'relative',
  },
});
