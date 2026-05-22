import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import SvgUri from 'expo-svg-uri';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import Button from '../components/ui/Button';
import { RegisterResponse } from '../types/auth';

const REGISTER_URL = 'https://api.freeapi.app/api/v1/users/register';

const SignupScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSignup = async () => {
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedEmail || !trimmedUsername || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
          role: 'USER',
          username: trimmedUsername,
        }),
      });

      const result = (await response.json()) as RegisterResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to create your account. Please try again.'
        );
      }

      setSuccessMessage(result.message || 'Account created successfully.');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to create your account. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrimaryPress = () => {
    if (successMessage) {
      navigation.navigate('Login');
      return;
    }

    handleSignup();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logo}>
            <SvgUri
              width={92}
              height={92}
              source={require('../../assets/svg/logo.svg')}
            />
            <Text style={styles.logoText}>Crave</Text>
            <Text style={styles.subtitle}>
              Create your food delivery account.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome6
                  name="envelope"
                  size={18}
                  color="#D9480F"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    clearMessages();
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome6
                  name="user"
                  size={18}
                  color="#D9480F"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Choose a username"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={username}
                  onChangeText={(value) => {
                    setUsername(value);
                    clearMessages();
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="username"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="lock"
                  size={20}
                  color="#D9480F"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    clearMessages();
                  }}
                  secureTextEntry={!isPasswordVisible}
                  textContentType="newPassword"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.trailingIcon}
                >
                  <Feather
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm password</Text>
              <View style={styles.inputWrapper}>
                <Feather
                  name="shield"
                  size={20}
                  color="#D9480F"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    clearMessages();
                  }}
                  secureTextEntry={!isPasswordVisible}
                  textContentType="newPassword"
                />
              </View>
            </View>

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {successMessage ? (
              <Text style={styles.successText}>{successMessage}</Text>
            ) : null}

            <Button
              icon={false}
              fontSize={20}
              onPress={handlePrimaryPress}
              text={
                successMessage
                  ? 'Go to login'
                  : isLoading
                    ? 'Creating account...'
                    : 'Create account'
              }
              disabled={isLoading}
            />
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    alignItems: 'center',
    marginBottom: 18,
  },

  logoText: {
    fontSize: 38,
    fontWeight: '700',
    color: '#D9480F',
    marginTop: -8,
  },

  subtitle: {
    marginTop: 6,
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },

  form: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  inputGroup: {
    marginTop: 14,
  },

  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },

  inputWrapper: {
    justifyContent: 'center',
  },

  input: {
    minHeight: 56,
    borderColor: '#F0D8C8',
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: 50,
    paddingRight: 18,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#111827',
    shadowColor: '#7C2D12',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },

  passwordInput: {
    paddingRight: 52,
  },

  inputIcon: {
    position: 'absolute',
    left: 18,
    zIndex: 1,
  },

  trailingIcon: {
    position: 'absolute',
    right: 16,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    marginTop: 18,
    color: '#B42318',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },

  successText: {
    marginTop: 18,
    color: '#067647',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },

  loginText: {
    color: '#6B7280',
    fontSize: 16,
  },

  loginLink: {
    color: '#D9480F',
    fontSize: 16,
    fontWeight: '700',
  },
});
