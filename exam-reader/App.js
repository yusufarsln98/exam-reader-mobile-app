import * as React from 'react';
import { createContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import OnboardingScreen from './screens/Onboarding';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';

import routes from './constants/routes';

export const AppContext = createContext();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <AppContext.Provider value={{}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen name={routes.ONBOARDING} component={OnboardingScreen} options={{ title: 'Onboarding' }} />
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name={routes.SIGNUP} component={SignUpScreen} options={{ title: 'Sign Up' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
  );
}


