import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Input, Button } from '@rneui/themed';
import { signup } from "../../services/authService";
import { COLORS, TR } from "../../constants";
import { globalStyles } from "../styles";
import { styles } from "./styles";
import { IconEye, IconEyeOff, IconLock, IconMail, IconUser } from "../../components/icons";
import { alert_privacy_policy, alert_terms_of_service } from "./policy";


function SignUpScreen() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      setError(true);
      setErrorMessage(TR.sign_up.fill_required_fields);
      return;
    }
    const response = await signup(fullName, email, password);
    console.log("response " + response);
    if (response) {
      setError(false);
    } else {
      setError(true);
      setErrorMessage(TR.sign_up.sign_up_failed);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgRectangle}></View>
      <View style={styles.header}>
          <Text style={[globalStyles.header]}>
            {TR.sign_up.sign_up}
          </Text>
        </View>
      <View style={[styles.content, globalStyles.panel]}>
        <View style={styles.inputs}>
          <Input
            placeholder="Ad Soyad"
            leftIcon={<IconUser color={COLORS.softBlack}/>}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            onChangeText={setFullName}
          />
          <Input
            placeholder="E-posta"
            leftIcon={<IconMail color={COLORS.softBlack}/>}
            inputContainerStyle={[styles.inputContainerStyle, {marginTop: -10}]}
            inputStyle={styles.inputStyle}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Şifre"
            secureTextEntry={!showPassword}
            leftIcon={<IconLock color={COLORS.softBlack}/>}
            rightIcon={
              showPassword ? (
                <IconEyeOff color={COLORS.softBlack} size={20} onPress={() => setShowPassword(false)}/>
              ) : (
                <IconEye color={COLORS.softBlack} size={20} onPress={() => setShowPassword(true)}/>
              )
            }
            inputContainerStyle={[styles.inputContainerStyle, {marginTop: -10}]}
            inputStyle={styles.inputStyle}
            onChangeText={setPassword}
            errorMessage={error ? errorMessage : null}
            errorStyle={{color: COLORS.red, fontFamily: "Poppins-Regular"}}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title={TR.sign_up.sign_up}
            buttonStyle={globalStyles.buttonPrimary}
            titleStyle={globalStyles.buttonPrimaryTitle}
            onPress={handleSignUp}
           />
        </View>
        <Text style={styles.policy}>
          <Text style={styles.policyText}>
            {TR.sign_up.by_signing_up}
          </Text>
          <Text style={[styles.policyLink, {color: COLORS.blue}]} onPress={alert_privacy_policy}>
            {TR.sign_up.terms_of_service}
          </Text>
          <Text style={styles.policyText}>
            {TR.sign_up.and}
          </Text>
          <Text style={[styles.policyLink, {color: COLORS.blue}]} onPress={alert_terms_of_service}>
            {TR.sign_up.privacy_policy}
          </Text>
          <Text style={styles.policyText}>
            {TR.sign_up.accept}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}



export default SignUpScreen;
