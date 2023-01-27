import React from "react";
import { Button, Image, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../App";
import routes from "../../constants/routes";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TR from "../../constants/TR";

import * as Svg from 'react-native-svg';

function OnboardingScreen( {navigation} ) {
  const appContext = React.useContext(AppContext);
  return (
    <SafeAreaView onLayout={appContext.value.onLayoutRootView}>
      <View>
        <Text>
          {TR.onboarding.title}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default OnboardingScreen;