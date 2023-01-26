import React from "react";
import { Button, Image, View, Text } from "react-native";

function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Onboarding screen</Text>
      <Button title="Go to register"/>
    </View>
  );
}

export default LoginScreen;