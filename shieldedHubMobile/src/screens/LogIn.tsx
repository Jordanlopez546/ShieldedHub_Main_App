import { TouchableOpacity, StyleSheet, Text, View, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import TheDoubleCircles from '../components/TheDoubleCircles';
import GetStartedAndLoginImageView from '../components/GetStartedAndLoginImageView';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';

// Next is to fix the onChange and value props in the input element


// Login Screen
const LogIn = () => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.05, // 5% of the screen
  };

  const handleGetStarted = () => {};

  return (
    <View
    style={styles.container}
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
    >
      <View style={styles.doubleCirclesContainer}>
        <TheDoubleCircles />
      </View>
      <View style={styles.getStartedImageContainer}>
        <Text style={[styles.firstText, {marginBottom: 5}]}>Welcome back!</Text>
        <GetStartedAndLoginImageView text="first" />
      </View>
      <View style={[styles.inputsContainer]}>
        <Input autoFocus={true} text='Enter your email' />
        <Input autoFocus={false} text='Enter your password' />
        <TouchableOpacity activeOpacity={0.3} onPress={() => alert('pressed')}>
          <Text style={[styles.firstText, {color: 'rgba(30, 144, 255, 0.77)', fontWeight: '400', marginVertical: 12}]}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.CustomBtnContainer}>
        <CustomButton onPress={handleGetStarted} text="Log In" />
        <View style={[styles.dontHaveContainer, containerStyles]}>
          <Text style={[styles.firstText, {fontWeight: '400', fontSize: 18}]}>Don't have an account? </Text>
          <TouchableOpacity activeOpacity={0.3}>
          <Text style={[styles.firstText, {color: 'rgba(30, 144, 255, 0.9)', fontWeight: '500', fontSize: 18}]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LogIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doubleCirclesContainer: {
    flex: 0.15,
  },
  getStartedImageContainer: {
    flex: 0.78,
    alignItems: "center",
    justifyContent: "center",
  },
  firstText: {
    fontSize: 20,
    fontWeight: "500",
  },
  firstTextContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
  inputsContainer: {
    alignItems: 'center',
  },
  CustomBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
