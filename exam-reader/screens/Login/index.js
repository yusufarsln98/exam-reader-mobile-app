import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Input, Button } from '@rneui/themed';
import { login } from "../../services/authService";
import { COLORS, TR, ROUTES } from "../../constants";
import { globalStyles } from "../styles";
import { styles } from "./styles";
import { IconEye, IconEyeOff, IconLock, IconMail } from "../../components/icons";
import { AppContext } from "../../App";
import { getErrorMessage, isErrorMessage } from "../../utils/utils";


function LoginScreen( { navigation } ) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { storeUserData } = React.useContext(AppContext);
  
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

    setLoading(true);
    const response = await login(email, password);
    setLoading(false);

    if (isErrorMessage(response)) {
      const message = getErrorMessage(response);
      setError(true);
      setErrorMessage(message);
      return;
    }
    storeUserData(response);
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.HOME }],
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
            inputContainerStyle={globalStyles.inputContainerStyle}
            inputStyle={globalStyles.inputStyle}
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
            inputContainerStyle={[globalStyles.inputContainerStyle, {marginTop: -10}]}
            inputStyle={globalStyles.inputStyle}
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
            loading={loading}
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
