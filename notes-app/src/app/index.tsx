import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteEditorScreen from "./screens/NoteEditorScreen";
import NotesListScreen from "./screens/NotesListScreen";

import { initialNotes } from "../lib/notes-data";
import type { Note } from "../lib/types";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleBack = () => {
    setSelectedNote(null);
  };

  const handleSave = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );

    setNotes(updatedNotes);

    setSelectedNote(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedNote ? (
        <NoteEditorScreen
          note={selectedNote}
          onBack={handleBack}
          onSave={handleSave}
        />
      ) : (
        <NotesListScreen notes={notes} onSelectNote={handleSelectNote} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
