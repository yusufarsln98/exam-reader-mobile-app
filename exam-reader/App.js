import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createContext } from 'react';

export const AppContext = createContext();

export default function App() {
  
  return (
    <View>
      <StatusBar style="auto" />
    </View>
  );
}


