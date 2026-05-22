import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/Button';
import SvgUri from 'expo-svg-uri';

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <ImageBackground
      source={require('../../assets/images/onboarding-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <SvgUri
              width={100}
              height={100}
              source={require('../../assets/svg/logo.svg')}
            />
            <Text style={styles.logoText}>Crave</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Top Badge */}
        <View style={styles.badge}>
          <Ionicons name="flame-outline" size={18} color="#D9480F" />
          <Text style={styles.badgeText}>Over 1M+ active users</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>
            Your Favorite{'\n'}
            Food, <Text style={styles.highlight}>Delivered{'\n'}Fast</Text>
          </Text>

          <Text style={styles.description}>
            Discover the best restaurants in your city and get delicious meals
            delivered to your doorstep in minutes.
          </Text>

          {/* Button */}
          <Button
            text="Get Started"
            icon={true}
            onPress={() => navigation.navigate('Login')}
            fontSize={26}
          />

          {/* Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* Pagination */}
          {/* <View style={styles.pagination}>
            <View style={styles.activeDot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View> */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    flexDirection: 'row',
  },

  logoText: {
    fontSize: 30,
    color: '#D9480F',
    fontWeight: 900,
    textAlign: 'center',
    marginBlock: 15,
  },

  skipButton: {
    backgroundColor: '#F8F8F8',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 50,
  },

  skipText: {
    fontSize: 15,
  },

  badge: {
    position: 'absolute',
    top: 240,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 115, 0, 0.12)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
  },

  badgeText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#D9480F',
    fontWeight: '600',
  },

  content: {
    marginTop: 180,
  },

  heading: {
    fontSize: 50,
    lineHeight: 60,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -1.5,
  },

  highlight: {
    color: '#D9480F',
  },

  description: {
    marginTop: 24,
    fontSize: 22,
    lineHeight: 30,
    color: '#4B5563',
    fontWeight: '400',
    width: '95%',
  },

  loginContainer: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontSize: 18,
    color: '#666',
  },

  loginLink: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D9480F',
  },

  pagination: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeDot: {
    width: 34,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#D9480F',
    marginHorizontal: 5,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
  },
});
