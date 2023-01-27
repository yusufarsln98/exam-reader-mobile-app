import * as React from 'react';
import { createContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';



export const AppContext = createContext();


export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <AppContext.Provider value={{}}>
        <Text>Open up App.js to start working on your app!</Text>
      </AppContext.Provider>
    </View>
  );
}


