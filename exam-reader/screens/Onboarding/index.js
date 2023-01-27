import React from "react";
import { Button, Image, View, Text } from "react-native";
import routes from "../../constants/routes";

function OnboardingScreen( {navigation} ) {
  return (
    <View>
      <Text>Onboarding screen</Text>
      <Button title="Login" onPress={() => navigation.navigate(routes.LOGIN)} />
      <Button title="Sign Up" onPress={() => navigation.navigate(routes.SIGNUP)} />
    </View>
  );
}

export default OnboardingScreen;