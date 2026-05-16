import * as React from 'react';
import { Text, View } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';

// function HomeScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button onPress={() => navigation.navigate('Profile')}>
//         Go to Profile
//       </Button>
//     </View>
//   );
// }

// function ProfileScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile Screen</Text>
//       <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
//     </View>
//   );
// }

const HomeStack = createNativeStackNavigator();

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    // <Tab.Navigator
    //   initialRouteName="Home"
    //   screenOptions={({ route }) => ({
    //     tabBarStyle: {
    //       height: 90,
    //       paddingBottom: 10,
    //     },
    //     tabBarActiveTintColor: 'blue',
    //     tabBarInactiveTintColor: 'gray',
    //     tabBarIcon: ({ focused, color, size }) => {
    //       const icon =
    //         route.name === 'Home'
    //           ? focused
    //             ? 'home'
    //             : 'home-outline'
    //           : focused
    //             ? 'person'
    //             : 'person-outline';

    //       return <Ionicons name={icon} size={size} color={color} />;
    //     },
    //   })}
    // >
    //   <Tab.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       title: 'Dashboard',
    //       tabBarLabel: 'Start',
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       tabBarBadge: 3,
    //     }}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator>
      <Tab.Screen
        name="Overview"
        component={HomeStackScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function DynamicBottomTabsNavigator() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
