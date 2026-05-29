export const initialNote = {
  id: '1',
  title: 'Go to gym',
  description: 'Exercise for 1 hour',
  isCompleted: false,
  time: new Date(),
};

export type NoteType = typeof initialNote;
