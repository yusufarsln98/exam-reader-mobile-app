import React from "react";
import { View, Text } from "react-native";
import { Button } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";
import routes from "../../constants/routes";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, TR } from "../../constants";

import LogoDark from "../../components/icons/LogoDark";
import { globalStyles } from "../styles";
import { styles } from "./styles";

import LoginScreen from "../Login";
import SignUpScreen from "../SignUp";

function HeaderLogo() {
  return <LogoDark width={60} height={60} />
}

function OnboardingScreenComponent( {navigation} ) {
  const appContext = React.useContext(AppContext);

  return (
    <SafeAreaView onLayout={appContext.value.onLayoutRootView} style={styles.container}>
      <View style={styles.bgRectangle}></View>
      <View style={styles.logoContainer}>
        <LogoDark width={80} height={80} />
        <Text style={[globalStyles.header1, styles.logoText]}>
          {TR.onboarding.title}
        </Text>
      </View>
      <View style={[styles.content, globalStyles.panel]}>
        <Text style={globalStyles.header2}>{TR.onboarding.welcome}</Text>
        <Text style={globalStyles.paragraph}>{TR.onboarding.slogan}</Text>
        <View style={styles.buttons}>
          <Button
              title={TR.onboarding.login}
              titleColor={COLORS.bgColor}
              onPress={() => navigation.navigate(routes.LOGIN)}
              buttonStyle={globalStyles.buttonPrimary}
              titleStyle={globalStyles.buttonPrimaryTitle}
          />
          <Button
              title={TR.onboarding.sign_up}
              titleColor={COLORS.primary}
              onPress={() => navigation.navigate(routes.SIGN_UP)}
              buttonStyle={globalStyles.buttonSecondary}
              titleStyle={globalStyles.buttonSecondaryTitle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Stack navigator
function OnboardingScreen() {
  const Stack = createNativeStackNavigator();
  
  const headerOptions = {
    headerShown: true, 
      headerTitle: HeaderLogo,
      headerTitleAlign: 'center',
      headerTintColor: COLORS.bgColor,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: COLORS.primary,
      }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={routes.ONBOARDING} 
        component={OnboardingScreenComponent} 
        options={{ headerShown: false }}
      >
      </Stack.Screen>
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={headerOptions}
      >
      </Stack.Screen>
      <Stack.Screen
        name={routes.SIGN_UP}
        component={SignUpScreen}
        options={headerOptions}
      >
      </Stack.Screen>
    </Stack.Navigator>
  );
}



export default OnboardingScreen;