import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#6366f1',
        drawerInactiveTintColor: '#9ca3af',
        drawerStyle: { backgroundColor: '#fff', width: 240 },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          drawerLabel: 'Explore',
          title: 'Explore',
          drawerIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Setting',
          title: 'Setting',
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
