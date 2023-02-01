import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, ROUTES, TR } from "../../constants";
import { AppContext } from "../../App";
import OnboardingScreen from "../Onboarding";
import { getClasses, getClass, getExams, getExam, getResults, getResult } from "./dummy";
import Tabs from "../../navigation/tabs";
import { globalStyles } from "../styles";
import { styles } from "./styles";

function HomeScreenComponent( {navigation} ) {
  const appContext = React.useContext(AppContext);
  const handleLogout = () => {
    appContext.logout();
    // navigate onboarding screen and clear stack
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.ONBOARDING }],
    });
  };

  return (
    <SafeAreaView onLayout={appContext.onLayoutRootView}>
      <View>
        <Text>Home</Text>
        <Button title={"Çıkış Yap"} onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

function HomeScreen() {
  const Stack = createNativeStackNavigator();
  
  const headerOptions = {
    headerShown: true,
    headerTitle: TR.app_name_upper,
    headerTitleStyle: {
      ...globalStyles.header1,
      color: COLORS.primary,
    },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    // set header background color
    headerStyle: {
      backgroundColor: COLORS.bgColor,
    }
}
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen 
        name={ROUTES.HOME}
        component={HomeScreenComponent} 
        options={ headerOptions }
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