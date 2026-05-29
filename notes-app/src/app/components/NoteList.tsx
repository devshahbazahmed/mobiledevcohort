import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NoteType } from '../constants/notes';
import { useTheme } from '../context/ThemeContext';
import NoteCard from './NoteCard';

const NoteList = ({
  searchText,
  notes,
  onNotePress,
}: {
  searchText: string;
  notes: NoteType[];
  onNotePress: (note: NoteType) => void;
}) => {
  const { theme } = useTheme();
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <FlatList
      data={filteredNotes}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: theme.colors.background }}>
          <NoteCard item={item} onNotePress={onNotePress} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default NoteList;

const styles = StyleSheet.create({});
