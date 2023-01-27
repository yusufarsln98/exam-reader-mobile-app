import React from "react";
import { Button, Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";
import routes from "../../constants/routes";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function OnboardingScreen( {navigation} ) {
  const appContext = React.useContext(AppContext);
  return (
    <SafeAreaView onLayout={appContext.value.onLayoutRootView}>
      
    </SafeAreaView>
  );
}

export default OnboardingScreen;