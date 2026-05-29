import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NoteType } from '../constants/notes';
import { useTheme } from '../context/ThemeContext';

const NoteCard = ({
  item,
  onNotePress,
}: {
  item: NoteType;
  onNotePress: (note: NoteType) => void;
}) => {
  const { theme } = useTheme();
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.cardBg,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={() => onNotePress(item)}
    >
      <View style={styles.noteTitle}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.time, { color: theme.colors.secondaryText }]}>
          {item.time.toLocaleString()}
        </Text>
      </View>
      <Text style={[styles.desc, { color: theme.colors.text }]}>
        {item.description}
      </Text>
    </Pressable>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    paddingInline: 20,
    paddingBlock: 25,
    borderRadius: 16,
  },
  noteTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  desc: {
    fontSize: 16,
    marginTop: 15,
  },
  time: {
    fontSize: 12,
  },
});
