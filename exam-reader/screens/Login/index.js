import React from "react";
import { Button, Image, View, Text, StyleSheet } from "react-native";
import { login, signup } from "../../services/authService";

function test() {
    signup("yusufarsln98@outlook.com", "password1234");
    console.log("test");
}

function LoginScreen() {
    test();
  return (
    <View style={styles.container}>
      <Text>Onboarding screen</Text>
      <Button title="here" onPress={test}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LoginScreen;