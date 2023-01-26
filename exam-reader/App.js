import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createContext } from 'react';
import OnboardingScreen from './screens/Onboard';
import LoginScreen from './screens/Login';

export const AppContext = createContext();


export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      {/* <OnboardingScreen /> */}
      <LoginScreen />
    </View>
  );
}


