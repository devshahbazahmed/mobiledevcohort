# Notes App UI – React Native Expo

A simple and clean Notes App UI built using React Native with Expo and TypeScript.

This project demonstrates:

- React Native core components
- Responsive layouts
- Dark/light theme handling
- Input handling
- KeyboardAvoidingView
- State-based screen switching
- Clean UI structure
- TypeScript support

---

# Features

## Notes Listing Screen

- Display notes using FlatList
- Search/filter notes
- Dark/Light mode toggle
- Responsive card layout
- Pressable note cards
- Tablet responsive design using useWindowDimensions()

## Note Editor Screen

- Edit note title
- Edit note content
- Save updated note
- Back button to return to notes list
- KeyboardAvoidingView support
- ImageBackground header

---

# Important

This project does NOT use:

- React Navigation
- Expo Router

Screen switching is handled manually using React state inside App.tsx.

---

# Tech Stack

- React Native
- Expo
- TypeScript

---

# Installation

## 1. Create Expo App

```bash
npx create-expo-app notes-app -t expo-template-blank-typescript
```
