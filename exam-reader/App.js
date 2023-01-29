import * as React from 'react';
import { createContext } from 'react';

import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './screens/Onboarding';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';

import routes from './constants/routes';
import TR from './constants/TR';

import { Dimensions } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export const AppContext = createContext();
SplashScreen.preventAutoHideAsync();


export default function App() {
  // -------------------- Fonts --------------------
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const { width, height } = Dimensions.get("window");

  // -------------------- Fonts end --------------------

  const value = {
    onLayoutRootView,
    dimensions: {
      width,
      height,
    },
  };

  return (
      <AppContext.Provider value={{value}}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <OnboardingScreen />
        </NavigationContainer>
      </AppContext.Provider>
  );
}


