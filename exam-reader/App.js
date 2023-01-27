import * as React from 'react';
import { createContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import OnboardingScreen from './screens/Onboarding';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';

import routes from './constants/routes';

export const AppContext = createContext();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  
  return (
      <AppContext.Provider value={{}}>
        <NavigationContainer>
          <Text>App</Text>
        </NavigationContainer>
      </AppContext.Provider>
  );
}


