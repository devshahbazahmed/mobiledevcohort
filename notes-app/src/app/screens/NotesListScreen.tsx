import React, { useMemo, useState } from "react";

import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import NoteCard from "../components/NoteCard";
import { darkTheme, lightTheme } from "../../lib/theme";
import type { Note } from "../../lib/types";

interface NotesListScreenProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
}

export default function NotesListScreen({
  notes,
  onSelectNote,
}: NotesListScreenProps) {
  const systemTheme = useColorScheme();

  const { width } = useWindowDimensions();

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(systemTheme === "dark");

  const theme = darkMode ? darkTheme : lightTheme;

  const isTablet = width >= 768;

  const filteredNotes = useMemo(() => {
    const q = search.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }, [search, notes]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.heading,
              {
                color: theme.text,
              },
            ]}
          >
            My Notes
          </Text>

          <Text
            style={[
              styles.subHeading,
              {
                color: theme.subText,
              },
            ]}
          >
            Organize your thoughts
          </Text>
        </View>

        <View style={styles.switchRow}>
          <Text
            style={[
              styles.modeText,
              {
                color: theme.text,
              },
            ]}
          >
            {darkMode ? "Dark" : "Light"}
          </Text>

          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      <TextInput
        placeholder="Search notes..."
        placeholderTextColor={theme.muted}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.input,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            theme={theme}
            isTablet={isTablet}
            onPress={() => onSelectNote(item)}
          />
        )}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet
            ? {
                justifyContent: "space-between",
              }
            : undefined
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
  },

  subHeading: {
    fontSize: 15,
    marginTop: 4,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  modeText: {
    marginRight: 8,
    fontWeight: "600",
  },

  searchInput: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
  },
});
