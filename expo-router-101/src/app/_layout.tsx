import { Stack } from 'expo-router';

export default function RootLayout() {
  const isLoggedIn = true;
  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        {/* <Stack.Screen name="about" />
      <Stack.Screen name="index" /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
