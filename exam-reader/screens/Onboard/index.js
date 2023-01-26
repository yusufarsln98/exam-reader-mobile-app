import { Button } from "react-native";
function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding screen</Text>
      <Button title="Go to register" onPress={() => navigation.navigate('Register')} />
      
    </View>
  );
}

export default OnboardingScreen;