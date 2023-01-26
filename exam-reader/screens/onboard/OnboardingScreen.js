import { Button } from "react-native";
export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding screen</Text>
      <Button title="Go to register" onPress={() => navigation.navigate('Register')} />
      
    </View>
  );
}
