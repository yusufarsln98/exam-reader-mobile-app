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
import TR from './constants/TR';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export const AppContext = createContext();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // -------------------- Fonts --------------------
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    console.log('onLayoutRootView()');
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      console.log('SplashScreen.hideAsync()');
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // -------------------- Fonts end --------------------

  value = {
    onLayoutRootView,
    Stack, 
    // fonts 
    fonts: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
  };


  return (
      <AppContext.Provider value={{value}}>
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </AppContext.Provider>
  );
}


