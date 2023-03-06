import 'react-native-gesture-handler';
import * as React from 'react';
import { createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import routes from './constants/routes';
import TR from './constants/TR';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const AppContext = createContext();

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    // const getUserData = async () => {
    //   try {
    //     let jsonValue = await AsyncStorage.getItem('user');
    //     return jsonValue != null ? JSON.parse(JSON.parse(jsonValue)) : null;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // getUserData().then((user) => {
    //   setUserData(user);
    // });
  }, []);

  // -------------------- Fonts --------------------
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const { width, height } = Dimensions.get("window");

  // -------------------- Fonts end --------------------

  const storeUserData = async (user) => {
    // try {
    //   await AsyncStorage.setItem('user', JSON.stringify(user));
    // } catch (e) {
    //   console.log(e);
    // }
  }

  const logout = async () => {
    // try {
    //   await AsyncStorage.removeItem('user');
    // } catch (e) {
    //   console.log(e);
    // }
  }

  const value = {
    onLayoutRootView,
    dimensions: {
      width,
      height,
    },
    storeUserData,
    userData,
    logout,
  };


  return (
    <AppContext.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <NavigationContainer>
          {/* {!userData ? (
            <OnboardingScreen />
          ) : (
            <HomeScreen />
          )} */}
          <HomeScreen />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}


