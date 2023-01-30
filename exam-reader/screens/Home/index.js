import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from "../../constants";
import { AppContext } from "../../App";
import OnboardingScreen from "../Onboarding";

function HomeScreenComponent( {navigation} ) {
  const appContext = React.useContext(AppContext);
  const handleLogout = () => {
    appContext.value.logout();
    // navigate onboarding screen and clear stack
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.ONBOARDING }],
    });
  };
  return (
    <SafeAreaView onLayout={appContext.value.onLayoutRootView}>
      <View>
        <Text>Home</Text>
        <Button title={"Çıkış Yap"} onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen 
        name={ROUTES.HOME}
        component={HomeScreenComponent} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ONBOARDING}
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;