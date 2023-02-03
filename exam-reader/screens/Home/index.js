import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, ROUTES, TR } from "../../constants";
import { AppContext } from "../../App";
import OnboardingScreen from "../Onboarding";
import { getClasses, getClass, getExams, getExam, getResults, getResult } from "./dummy";
import { globalStyles } from "../styles";
import { styles } from "./styles";
import ClassesScreen from "../Classes";
import AboutScreen from "../About";
import ExamsScreen from "../Exams";
import { IconExams, IconHome, IconInfo, IconMenu, IconUsers } from "../../components/icons";
import LogoDark from "../../components/icons/LogoDark";
import { TouchableOpacity } from "react-native-gesture-handler";
import CostumDrawer from "../../components/CostumDrawer";


function HomeScreenComponent( {navigation} ) {
  const appContext = React.useContext(AppContext);

  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
        <Text>Home Screen</Text>
    </View>
  );
};

function HomeScreenTab({navigation}) {
  const Tab = createBottomTabNavigator();
  const Menu = () => {
    return (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IconMenu color={COLORS.primary} onPress={() => navigation.openDrawer()} style={{marginLeft: 16}} />
      </TouchableOpacity>
    );
  };
  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: COLORS.bgColor,
    },
    headerTintColor: COLORS.primary,
    headerTitleStyle: {
      fontFamily: "Poppins-Medium",
      fontSize: 18,
      color: COLORS.primary,
    },
    headerTitleAlign: 'center',
  };


  return (
    <Tab.Navigator 
        initialRouteName={ROUTES.HOME} 
        backBehavior={'history'}
        screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
           // hide the label 
           let iconName;
           if (route.name === ROUTES.HOME) {
              return  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, top: 4}}>
                        <IconHome color={color} size={focused ? 28 : 24} />
                        <Text style={{color: color, fontSize: focused ? 14 : 12, fontFamily: 'Poppins-Regular'}}>{TR.home.home}</Text>
                      </View>
            } else if (route.name === ROUTES.CLASSES) {
              return  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, top: 4}}>
                        <IconUsers color={color} size={focused ? 28 : 24} />
                        <Text style={{color: color, fontSize: focused ? 14 : 12, fontFamily: 'Poppins-Regular'}}>{TR.classes.classes}</Text>
                      </View>
            } else {
              return  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, top: 4}}>
                        <IconExams color={color} size={focused ? 28 : 24} />
                        <Text style={{color: color, fontSize: focused ? 14 : 12, fontFamily: 'Poppins-Regular'}}>{TR.exams.exams}</Text>
                      </View>
            }},
          tabBarActiveTintColor: COLORS.snow,
          tabBarInactiveTintColor: COLORS.softGray,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 10,
            right: 10,
            height: 64,
            elevation: 0,
            backgroundColor: COLORS.primary,
            borderTopWidth: 0,
            shadowColor: COLORS.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 15,
          },
        })}

    >
      <Tab.Screen
        name={ROUTES.CLASSES}
        component={ClassesScreen}
        options={{...options, 
                    headerTitle: TR.classes.classes,
                    headerTitleAlign: 'left', 
                    tabBarLabel: TR.classes.classes,
                }}
      />
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreenComponent}
        options={{...options, 
                    headerTitle: TR.app_name_upper, 
                    headerLeft: () => (<Menu />),
                    tabBarLabel: TR.home.home,
                }}
      />
      <Tab.Screen
        name={ROUTES.EXAMS}
        component={ExamsScreen}
        options={{...options, 
                    headerTitle: TR.exams.exams,
                    headerTitleAlign: 'left',
                    tabBarLabel: TR.exams.exams,
                  }}
      />
    </Tab.Navigator>
  );
}

function HomeScreenDrawer() {
  const Drawer = createDrawerNavigator();
  const options = {
    drawerStyle: {
      backgroundColor: COLORS.bgColor,
    },
    headerShown: false,
    drawerLabelStyle: {
      ...globalStyles.header3,
      color: COLORS.primary,
    },
  }

  return (
    <Drawer.Navigator initialRouteName={ROUTES.HOME_BOTTOM_TABS} drawerContent={props => <CostumDrawer {...props} />}>
      <Drawer.Screen
        name={ROUTES.HOME_BOTTOM_TABS}
        component={HomeScreenTab}
        options={{...options, 
                    drawerLabel: TR.home.home,
                    drawerIcon: () => <LogoDark />
                }}
      />
      <Drawer.Screen
        name={ROUTES.ABOUT}
        component={AboutScreen}
        options={{...options, 
                    drawerLabel: TR.about.about, 
                    drawerIcon: () => <IconInfo color={COLORS.primary} />
                }}
      />
    </Drawer.Navigator>
  );
}

function HomeScreen() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME_DRAWER}>
      <Stack.Screen 
        name={ROUTES.HOME_DRAWER}
        component={HomeScreenDrawer} 
        options={ {headerShown: false} }
      />
      <Stack.Screen
        name={ROUTES.ONBOARDING}
        component={OnboardingScreen}
        options={ {headerShown: false} }
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;