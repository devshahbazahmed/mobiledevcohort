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
