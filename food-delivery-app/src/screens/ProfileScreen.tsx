import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ProfileScreen = () => {
  const profileData = {
    name: 'Alex Morgan',
    memberStatus: 'Gold Member',
    totalOrders: 24,
    cravePoints: 1250,
  };

  const menuItems = [
    {
      id: 'favorites',
      title: 'My Favorites',
      icon: 'heart-outline',
      iconLib: 'ionicons',
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: 'credit-card-outline',
      iconLib: 'ionicons',
    },
    {
      id: 'promo',
      title: 'Promo Codes',
      icon: 'tag-outline',
      iconLib: 'ionicons',
      badge: '2 NEW',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'cog-outline',
      iconLib: 'ionicons',
    },
    {
      id: 'help',
      title: 'Help Center',
      icon: 'help-circle-outline',
      iconLib: 'ionicons',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <MaterialCommunityIcons
                name="account"
                size={60}
                color="#D9480F"
              />
            </View>
            <View style={styles.callIcon}>
              <Ionicons name="call" size={16} color="white" />
            </View>
          </View>

          <Text style={styles.profileName}>{profileData.name}</Text>

          <View style={styles.memberBadge}>
            <MaterialCommunityIcons
              name="shield-account"
              size={16}
              color="#D9480F"
            />
            <Text style={styles.memberText}>{profileData.memberStatus}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profileData.totalOrders}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {profileData.cravePoints.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Crave Points</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  {item.iconLib === 'ionicons' ? (
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color="#D9480F"
                    />
                  ) : (
                    <FontAwesome
                      name={item.icon as any}
                      size={24}
                      color="#D9480F"
                    />
                  )}
                </View>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>

              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={24} color="#8A8A8A" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Referral Card */}
        <View style={styles.referralCard}>
          <View style={styles.referralContent}>
            <Text style={styles.referralTitle}>Refer a friend, get $20</Text>
            <Text style={styles.referralSubtitle}>Share the Crave love</Text>
          </View>
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Invite Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5EBE3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  callIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9480F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EBE3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  memberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0D8C8',
    overflow: 'hidden',
  },
  statBox: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0D8C8',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D9480F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8A8A8A',
    fontWeight: '500',
  },
  menuContainer: {
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0D8C8',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EBE3',
    backgroundColor: '#fff',
  },
  menuItem_last: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5EBE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    backgroundColor: '#D9480F',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  referralCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  referralContent: {
    marginBottom: 16,
  },
  referralTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  referralSubtitle: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '400',
  },
  referralImageContainer: {
    backgroundColor: '#D9480F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  inviteButton: {},
  inviteButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default ProfileScreen;
