import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const profileData = {
    name: 'Alex Morgan',
    email: 'alex.m@example.com',
    memberStatus: 'Gold Member',
  };

  const drawerItems = [
    {
      id: 'myorders',
      label: 'My Orders',
      icon: 'receipt-outline',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'cog-outline',
    },
    {
      id: 'help',
      label: 'Help',
      icon: 'help-circle-outline',
    },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <MaterialCommunityIcons name="account" size={50} color="white" />
          </View>
        </View>

        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileEmail}>{profileData.email}</Text>

        <View style={styles.memberBadge}>
          <Text style={styles.memberText}>{profileData.memberStatus}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {drawerItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => {
              // Handle navigation based on item id
              navigation.closeDrawer();
            }}
          >
            <Ionicons name={item.icon as any} size={24} color="#333" />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="#D9480F" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  profileImageContainer: {
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9480F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D9480F',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8A8A8A',
    marginBottom: 8,
    fontWeight: '500',
  },
  memberBadge: {
    backgroundColor: '#D9480F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  memberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D9480F',
  },
});

export default DrawerContent;
