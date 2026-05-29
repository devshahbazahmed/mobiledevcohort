import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { NoteType } from '../constants/notes';
import { useTheme } from '../context/ThemeContext';

type AddNoteScreenProps = {
  addNote: (note: NoteType) => void;
  onClose: () => void;
};

const AddNoteScreen = ({ addNote, onClose }: AddNoteScreenProps) => {
  const { theme } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;

    addNote({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
      time: new Date(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Add Note
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.colors.secondaryText}
        style={[
          styles.input,
          {
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor={theme.colors.secondaryText}
        style={[
          styles.descriptionInput,
          {
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
      />

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>

      <Pressable onPress={onClose} style={styles.cancelButton}>
        <Text
          style={{
            color: theme.colors.secondaryText,
          }}
        >
          Cancel
        </Text>
      </Pressable>
    </View>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },

  descriptionInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 140,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 24,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  cancelButton: {
    alignItems: 'center',
    marginTop: 20,
  },
});
