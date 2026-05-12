import React, { useEffect, useState } from "react";

import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { darkTheme, lightTheme } from "../../lib/theme";
import type { Note } from "../../lib/types";

interface NoteEditorScreenProps {
  note: Note;
  onBack: () => void;
  onSave: (updatedNote: Note) => void;
}

export default function NoteEditorScreen({
  note,
  onBack,
  onSave,
}: NoteEditorScreenProps) {
  const systemTheme = useColorScheme();

  const theme = systemTheme === "dark" ? darkTheme : lightTheme;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    onSave({
      ...note,
      title,
      content,
      date: new Date().toDateString(),
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200",
          }}
          style={styles.headerImage}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <Text style={styles.headerText}>Edit Note</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Note Title"
            placeholderTextColor={theme.muted}
            style={[
              styles.titleInput,
              {
                backgroundColor: theme.input,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />

          <TextInput
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            placeholder="Write your note..."
            placeholderTextColor={theme.muted}
            style={[
              styles.bodyInput,
              {
                backgroundColor: theme.input,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />

          <View style={styles.buttonRow}>
            <Pressable
              onPress={onBack}
              style={StyleSheet.flatten([
                styles.button,
                {
                  backgroundColor: "#8B5CF6",
                },
              ])}
            >
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>

            <Pressable
              onPress={handleSave}
              style={StyleSheet.flatten([
                styles.button,
                {
                  backgroundColor: "#22C55E",
                },
              ])}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerImage: {
    height: 220,
    justifyContent: "flex-end",
  },

  imageStyle: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  content: {
    padding: 20,
  },

  titleInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 18,
    marginBottom: 18,
  },

  bodyInput: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 16,
    minHeight: 220,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 0.48,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
