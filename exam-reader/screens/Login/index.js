import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Input, Button } from '@rneui/themed';
import { login } from "../../services/authService";
import { COLORS, TR } from "../../constants";
import { globalStyles } from "../styles";
import { styles } from "./styles";
import { IconEye, IconEyeOff, IconLock, IconMail } from "../../components/icons";


function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = async () => {
    if (!email) {
      setError(true);
      setErrorMessage(TR.login.email_required);
      return;
    }
    if (!password) {
      setError(true);
      setErrorMessage(TR.login.password_required);
      return;
    }

    const response = await login(email, password);
    if (response) {
      setError(false);
    } else {
      setError(true);
      setErrorMessage(TR.login.login_failed);
    }
    console.log(response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgRectangle}></View>
      <View style={styles.header}>
          <Text style={[globalStyles.header]}>
            {TR.login.login}
          </Text>
        </View>
      <View style={[styles.content, globalStyles.panel]}>
        <View style={styles.inputs}>
          <Input
            placeholder="E-posta"
            leftIcon={<IconMail color={COLORS.softBlack}/>}
            inputContainerStyle={styles.inputContainerStyle}
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
            title={TR.login.login}
            buttonStyle={globalStyles.buttonPrimary}
            titleStyle={globalStyles.buttonPrimaryTitle}
            onPress={handleLogin}
           />
        </View>
        <View style={styles.forgotPassword}>
          <Text onPress={() => alert("Not Implemented Yet!")} style={styles.forgotPasswordText}>
            Şifremi Unuttum
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}



export default LoginScreen;
