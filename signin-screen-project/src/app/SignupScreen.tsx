import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = ({ goToNextScreen }: { goToNextScreen: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Image source={require("@/assets/screen-logo.png")} />
          <Text style={styles.heading}>Signup</Text>
          <Text style={styles.subTitle}>Sign up in 1 minute for free!</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity style={styles.inputIcon}>
                <FontAwesome name="envelope-o" size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
              <TouchableOpacity style={styles.inputIcon}>
                <Feather name="lock" size={24} color="#777" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
              />
              <TouchableOpacity style={styles.inputIcon}>
                <Feather name="lock" size={24} color="#777" />
              </TouchableOpacity>
            </View>
          </View>
          <Pressable style={styles.button}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
              Sign up
            </Text>
            <Feather name="arrow-right" size={24} color="#fff" />
          </Pressable>
          <View style={styles.bottomBar}>
            <Text>Already have an account? </Text>
            <Pressable onPress={goToNextScreen}>
              <Text style={{ color: "#86cd17", fontWeight: 600 }}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heading: {
    fontFamily: "helvetica",
    fontSize: 45,
    fontWeight: 800,
  },
  subTitle: {
    color: "gray",
    fontSize: 16,
    fontWeight: 300,
    position: "relative",
  },
  inputGroup: {
    width: "100%",
    marginTop: 25,
  },
  label: {
    paddingLeft: 25,
    marginBottom: 10,
    fontWeight: 800,
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  inputIcon: {
    marginRight: 10,
    position: "absolute",
    left: 35,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 10,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 45,
    paddingRight: 15,
    paddingVertical: 15,
    fontSize: 16,
    marginInline: 20,
    backgroundColor: "#fff",
    shadowColor: "#111",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    width: "90%",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#86cd17",
    color: "#fff",
    borderRadius: 18,
    paddingBlock: 16,
    marginTop: 30,
    shadowColor: "#111",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 30,
  },
  iconSocial: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#111",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  bottomBar: {
    marginTop: 30,
    flexDirection: "row",
    gap: 5,
  },
});
