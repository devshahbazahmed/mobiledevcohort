import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import NoteList from '../components/NoteList';
import Search from '../components/Search';
import { NoteType } from '../constants/notes';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({
  notes,
  onNotePress,
  onAddPress,
}: {
  notes: NoteType[];
  onNotePress: (note: NoteType) => void;
  onAddPress: () => void;
}) => {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState<string>('');

  return (
    <>
      {/* Searchbar */}
      <Search value={searchText} onChange={setSearchText} />

      {/* Add Note Button */}
      <Pressable
        onPress={onAddPress}
        style={[
          styles.addNoteButton,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={[styles.addNoteText, { color: theme.colors.text }]}>
          <AntDesign name="plus" size={24} color={theme.colors.text} /> Add Note
        </Text>
      </Pressable>

      {/* List Notes */}
      <View
        style={[
          styles.noteTitleView,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.noteTitle, { color: theme.colors.text }]}>
          Recent Notes
        </Text>
      </View>

      <NoteList
        searchText={searchText}
        notes={notes}
        onNotePress={onNotePress}
      />
    </>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  noteTitleView: {
    paddingInline: 16,
    marginTop: 20,
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  addNoteButton: {
    borderRadius: 14,
    padding: 16,
    marginBlock: 20,
    marginInline: 16,
    width: '40%',
  },
  addNoteText: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontSize: 18,
  },
});
