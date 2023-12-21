import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import { RootStackParams } from '../../types/types';

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='GetStarted' screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})