import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import CartScreen from '../../screens/CartScreen';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

function MenuButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation && 'openDrawer' in navigation) {
          (navigation as any).openDrawer();
        }
      }}
      style={{ paddingHorizontal: 16 }}
    >
      <Ionicons name="menu" size={24} color="#D9480F" />
    </TouchableOpacity>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#F0D8C8',
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '700',
          color: '#1a1a1a',
        },
        headerLeft: () => <MenuButton />,
        tabBarActiveTintColor: '#D9480F',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          borderTopColor: '#F0D8C8',
          backgroundColor: '#fff',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, TabIconName> = {
            HomeTab: 'home-outline',
            Search: 'search-outline',
            Orders: 'receipt-outline',
            Profile: 'person-outline',
          };
          const iconName = icons[route.name] ?? 'ellipse-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Orders"
        component={CartScreen}
        options={{ title: 'Orders' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
