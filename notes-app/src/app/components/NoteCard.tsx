import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import type { ThemeType } from "../../lib/theme";
import type { Note } from "../../lib/types";

export interface NoteCardProps {
  note: Note;
  theme: ThemeType;
  onPress: () => void;
  isTablet?: boolean;
}

const PREVIEW_MAX = 120;

export default function NoteCard({
  note,
  theme,
  onPress,
  isTablet,
}: NoteCardProps) {
  const preview = useMemo(() => {
    const text = note.content.trim();
    if (text.length <= PREVIEW_MAX) return text;
    return `${text.slice(0, PREVIEW_MAX).trimEnd()}…`;
  }, [note.content]);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isTablet ? styles.cardTablet : undefined,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {note.title}
      </Text>
      <Text style={[styles.date, { color: theme.muted }]}>{note.date}</Text>
      <Text style={[styles.preview, { color: theme.subText }]} numberOfLines={3}>
        {preview}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardTablet: {
    flex: 1,
    marginHorizontal: 6,
    maxWidth: "48%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  date: {
    fontSize: 13,
    marginTop: 6,
  },
  preview: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
});
