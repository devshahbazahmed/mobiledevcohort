import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Button = ({
  text,
  icon,
  onPress,
  fontSize,
  disabled = false,
}: {
  text: string;
  icon: boolean;
  onPress: () => void;
  fontSize: number;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { fontSize: fontSize }]}>{text}</Text>

      {icon ? (
        <Ionicons
          name="arrow-forward"
          size={28}
          color="#fff"
          style={{ marginLeft: 10 }}
        />
      ) : (
        null
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    backgroundColor: '#D9480F',
    height: 60,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#D9480F',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },

  disabledButton: {
    opacity: 0.65,
  },
});
