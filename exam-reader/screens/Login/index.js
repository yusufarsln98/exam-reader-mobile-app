import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Input, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from "../../services/authService";
import { COLORS, TR, ROUTES } from "../../constants";
import { globalStyles } from "../styles";
import { styles } from "./styles";
import { IconEye, IconEyeOff, IconLock, IconMail } from "../../components/icons";
import { AppContext } from "../../App";


function LoginScreen( { navigation } ) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const { storeUserData, userData } = React.useContext(AppContext).value;
  
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
      console.log(response);

    } else {
      setError(true);
      setErrorMessage(TR.login.login_failed);
      // bu condition hatali olabilir, ne oldugunu kullaniciya goster 
    }

    const dummy = {
      "id": 1,
      "name": "Ahmet",
      "surname": "Yılmaz",
      "email": "dummy4@gmail.com",
    };
    // save user to async storage
    // await AsyncStorage.setItem("user", JSON.stringify(dummy));
    // set user data to context

    storeUserData(dummy);
    // reset the stack and navigate to home screen
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.HOME, params: { user: dummy } }],
    });
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
          <Text 
            onPress={() => navigation.navigate("ForgotPassword")} 
            style={styles.forgotPasswordText}
          >
            Şifremi Unuttum
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}



export default LoginScreen;
