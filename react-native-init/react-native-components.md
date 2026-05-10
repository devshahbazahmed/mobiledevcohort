<!-- import { useState } from 'react';
import { Text, View, Image, TextInput, Pressable } from 'react-native';

export default function HomeScreen() {
  const [name, setName] = useState('');
  return (
    <View>
      <Text numberOfLines={5}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. A vitae est
        voluptatem perspiciatis eum at obcaecati maxime iusto nulla id, animi
        laudantium reiciendis, odit eligendi. Enim animi, reiciendis error,
        dolorum ab veniam dolores sed sunt mollitia voluptatum molestiae
        expedita impedit incidunt architecto quo nostrum omnis obcaecati placeat
        voluptatibus totam. Sint.
      </Text>

      {/* Remote image from internet */}
      <Image
        source={{
          uri: 'https://chaicode.com/assets/hitesh-suraj-dark-CKHA9jfT.webp',
        }}
        width={200}
        height={200}
      />

      {/* Local Image */}
      <Image
        source={require('@/assets/images/icon.png')}
        style={{ height: 100, width: 100 }}
        blurRadius={30}
      />

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={'orange'}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          marginTop: 10,
          fontSize: 24,
        }}
      />

      <Pressable
        // onLongPress={}
        // onPressIn={}
        // onPressOut={}
        onPress={() => alert('Button Pressed')}
        style={({ hovered, pressed }) => ({
          backgroundColor: pressed ? '#4a42d4' : '#6c63ff',
        })}
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
      >
        {({ pressed, hovered }) =>
          pressed ? <Text>Pressing...</Text> : <Text>Press Me</Text>
        }
      </Pressable>
    </View>
  );
} -->

<!-- import {
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

const HomeScreen = () => {
  const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ScrollView style={{ flex: 1 }}>
      {items.map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 10,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item}</Text>
        </View>
      ))}

      <Button
        title="Hello I am a button"
        onPress={() => alert('Hello World')}
      />
      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
        trackColor={{ false: '#ddd', true: '#6c63ff' }}
        thumbColor={'yellow'}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({}); -->

<!-- import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  const USERS = [
    { id: '1', name: 'Alice Johnson', role: 'Designer' },
    { id: '2', name: 'Bob Smith', role: 'Developer' },
    { id: '3', name: 'Carol White', role: 'Manager' },
    { id: '4', name: 'David Brown', role: 'Developer' },
    { id: '5', name: 'Eve Davis', role: 'Designer' },
  ];
  return (
    <FlatList
      data={USERS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: 'black' }} />
      )}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({}); -->

<!-- import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
            Login
          </Text>

          <TextInput
            placeholder="Email"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 14,
              fontSize: 16,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 14,
              fontSize: 16,
              marginBottom: 20,
            }}
          />

          <Pressable
            style={{
              backgroundColor: "#6C63FF",
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} -->

<!-- import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function UnsafeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
      <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>Header</Text>
      <Text style={{ color: "#aaa", padding: 16 }}>
        This content might be hidden behind the status bar in the dark mode{" "}
      </Text>
    </View>
  );
}

function SafeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c1e" }}>
      <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>Header</Text>
      <Text style={{ color: "#aaa", padding: 16 }}>
        This content respects safe area on all devices{" "}
      </Text>
    </SafeAreaView>
  );
}

const index = () => {
  return (
    <>
      {/* <UnsafeScreen /> */}
      <SafeScreen />
    </>
  );
};

export default index;

const styles = StyleSheet.create({}); -->

<!-- import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({}); -->
<!--
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar style={"dark"} />
      <View style={styles.card}>
        <Text style={styles.title}>HomeScreen</Text>
        <Text style={styles.subtitle}>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    margin: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {},
  subtitle: {},
}); -->

<!-- import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  const isActive = true;
  const buttonStyle = StyleSheet.compose(
    styles.button,
    isActive ? styles.activeButton : null
  );
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>Composed Style</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: "#ccc", // Default grey
  },
  activeButton: {
    backgroundColor: "#6C63FF", // Override to purple when active
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
}); -->

<!-- import { StyleSheet, Text, View } from "react-native";
import React from "react";

const styleA = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 16,
  },
});

const styleB = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

const flat = StyleSheet.flatten([styleA.text, styleB.text]);

const HomeScreen = () => {
  return <Text style={flat}>Flattened Style!</Text>;
};

export default HomeScreen; -->

<!-- import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { height, width } = useWindowDimensions();

  const isTablet = width >= 768;
  const isLandscape = width > height;

  const lockLanscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const lockPortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: width * 0.06 }}>Responsive Text 📱</Text>

      <View
        style={{
          flexDirection: isTablet ? "row" : "column",
        }}
      >
        <View
          style={{
            width: isTablet ? width / 2 : width - 32,
            backgroundColor: "#6C63FF",
            padding: 20,
            borderRadius: 12,
            marginBottom: isTablet ? 0 : 12,
          }}
        >
          <Text style={{ color: "white" }}>Card 1</Text>
        </View>
        <View
          style={{
            width: isTablet ? width / 2 : width - 32,
            backgroundColor: "#FF6584",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white" }}>Card 2</Text>
        </View>
      </View>

      <Text style={{ color: "#888", marginTop: 16 }}>
        Screen: {Math.round(width)} × {Math.round(height)}
        {isLandscape ? " (Landscape)" : " (Portrait)"}
      </Text>

      {/* Orientation Buttons */}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <Pressable
          onPress={lockLanscape}
          style={{
            flex: 1,
            backgroundColor: "#6C63FF",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Force Landscape 🔄</Text>
        </Pressable>

        <Pressable
          onPress={lockPortrait}
          style={{
            flex: 1,
            backgroundColor: "#FF6584",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Force Portrait 📱</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({}); -->
