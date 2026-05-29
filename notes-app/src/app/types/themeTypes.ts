export const lightTheme = {
  mode: 'light',
  colors: {
    background: '#F7F7F8',
    cardBg: '#FFFFFF',
    surface: '#F7F7F8',
    text: '#111827',
    secondaryText: '#6B7280',
    primary: '#2563EB',
    border: '#E5E7EB',
    danger: '#EF4444',
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#0F172A',
    cardBg: '#020611',
    surface: '#1E293B',
    text: '#F8FAFC',
    secondaryText: '#94A3B8',
    primary: '#3B82F6',
    border: '#334155',
    danger: '#F87171',
  },
};

export type Theme = typeof lightTheme;
