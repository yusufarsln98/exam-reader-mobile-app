import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, ROUTES, TR, DIMENSIONS } from "../../constants";
import ClassesScreen from "../Classes";
import ExamsScreen from "../Exams";
import { IconExams, IconExamsOutline, IconExamsSharp, IconHome, IconHomeOutline, IconMenu, IconPeople, IconPeopleOutline, IconUsers } from "../../components/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HomeScreenComponent } from "./index";
import { globalStyles } from "../styles";

export function HomeScreenTab({ navigation }) {
  const Tab = createBottomTabNavigator();
  const Menu = () => {
    return (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IconMenu color={COLORS.primary} onPress={() => navigation.openDrawer()} style={{ marginLeft: 16 }} />
      </TouchableOpacity>
    );
  };
  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: COLORS.bgColor,
      shadowColor: COLORS.mainGray,
      elevation: 5,
    },
    headerTintColor: COLORS.primary,
    headerTitleStyle: {
      ...globalStyles.header2Bold,
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
          if (route.name === ROUTES.HOME) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: 4 }}>
              {focused ?
                <IconHome color={color} size={26} /> :
                <IconHomeOutline color={color} size={20} />
              }
              <Text style={{ color: color, fontSize: focused ? 12 : 10, fontFamily: 'Poppins-Regular' }}>{TR.home.home}</Text>
            </View>;
          } else if (route.name === ROUTES.CLASSES) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: 4 }}>
              {focused ?
                <IconPeople color={color} size={26} /> :
                <IconPeopleOutline color={color} size={20} />
              }
              <Text style={{ color: color, fontSize: focused ? 12 : 10, fontFamily: 'Poppins-Regular' }}>{TR.classes.classes}</Text>
            </View>;
          } else {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: 4 }}>
              {focused ?
                <IconExamsSharp color={color} size={26} /> :
                <IconExamsOutline color={color} size={20} />
              }
              <Text style={{ color: color, fontSize: focused ? 12 : 10, fontFamily: 'Poppins-Regular' }}>{TR.exams.exams}</Text>
            </View>;
          }
        },
        tabBarActiveTintColor: COLORS.snow,
        tabBarInactiveTintColor: COLORS.softGray,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          height: DIMENSIONS.bottom_bar_height,
          backgroundColor: COLORS.primary,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        // hide tab bar on keyboard open
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name={ROUTES.CLASSES}
        component={ClassesScreen}
        options={{
          headerShown: false,
          tabBarLabel: TR.classes.classes,
        }}
      />
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreenComponent}
        options={{
          ...options,
          headerTitle: TR.app_name_upper,
          headerLeft: () => (<Menu />),
          tabBarLabel: TR.home.home,
        }} />
      <Tab.Screen
        name={ROUTES.EXAMS}
        component={ExamsScreen}
        options={{
          headerShown: false,
          tabBarLabel: TR.exams.exams,
        }} />
    </Tab.Navigator>
  );
}
