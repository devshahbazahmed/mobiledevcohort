import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from './components/Navbar';
import { NoteType } from './constants/notes';
import { useTheme } from './context/ThemeContext';
import AddNoteScreen from './screens/AddNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import HomeScreen from './screens/HomeScreen';

type Screen = 'home' | 'add' | 'edit';

export default function Index() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const { theme, manualDark } = useTheme();

  const addNote = (note: NoteType) => {
    const newNote = {
      id: Date.now().toString(),
      title: note.title,
      description: note.description,
      isCompleted: note.isCompleted,
      time: note.time,
    };

    setNotes((prev) => [newNote, ...prev]);
    setScreen('home');
  };

  const updatedNote = (editNote: NoteType) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === editNote.id ? { ...note, editNote } : note
      )
    );

    setScreen('home');
    setSelectedNote(null);
  };

  const openEditNote = (note: NoteType) => {
    setSelectedNote(note);
    setScreen('edit');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <KeyboardAvoidingView>
        <StatusBar style={manualDark ? 'light' : 'dark'} />
        <Navbar />
        {screen === 'home' && (
          <HomeScreen
            notes={notes}
            onAddPress={() => setScreen('add')}
            onNotePress={openEditNote}
          />
        )}
        {screen === 'add' && (
          <AddNoteScreen addNote={addNote} onClose={() => setScreen('home')} />
        )}
        {screen === 'edit' && (
          <EditNoteScreen
            note={selectedNote}
            updateNote={updatedNote}
            onClose={() => setScreen('home')}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
