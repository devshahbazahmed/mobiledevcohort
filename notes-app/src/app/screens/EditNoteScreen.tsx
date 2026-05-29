import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NoteType } from '../constants/notes';
import { useTheme } from '../context/ThemeContext';

type EditNoteScreenProps = {
  note: NoteType | null;
  updateNote: (note: NoteType) => void;
  onClose: () => void;
};

const EditNoteScreen = ({ note, updateNote, onClose }: EditNoteScreenProps) => {
  const { theme } = useTheme();

  const [title, setTitle] = useState(note?.title);

  const [description, setDescription] = useState(note?.description);

  const handleSave = () => {
    if (!note?.title.trim()) return;

    updateNote({
      ...note,
      title: note.title.trim(),
      description: note.description.trim(),
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.heading,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Edit Note
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
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
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Description"
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
        <Text style={styles.buttonText}>Save Changes</Text>
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

export default EditNoteScreen;

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
