import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, ROUTES, TR } from "../../constants";
import ClassesScreen from "../Classes";
import ExamsScreen from "../Exams";
import { IconExams, IconHome, IconMenu, IconUsers } from "../../components/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HomeScreenComponent } from "./index";

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
          if (route.name === ROUTES.HOME) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: 4 }}>
              <IconHome color={color} size={focused ? 28 : 24} />
              <Text style={{ color: color, fontSize: focused ? 14 : 12, fontFamily: 'Poppins-Regular' }}>{TR.home.home}</Text>
            </View>;
          } else if (route.name === ROUTES.CLASSES) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: 4 }}>
              <IconUsers color={color} size={focused ? 28 : 24} />
              <Text style={{ color: color, fontSize: focused ? 14 : 12, fontFamily: 'Poppins-Regular' }}>{TR.classes.classes}</Text>
            </View>;
          } else {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, top: 4 }}>
              <IconExams color={color} size={focused ? 28 : 24} />
              <Text style={{ color: color, fontSize: focused ? 14 : 12, fontFamily: 'Poppins-Regular' }}>{TR.exams.exams}</Text>
            </View>;
          }
        },
        tabBarActiveTintColor: COLORS.snow,
        tabBarInactiveTintColor: COLORS.softGray,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 10,
          right: 10,
          height: 64,
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
        options={{
          ...options,
          headerTitle: TR.classes.classes,
          headerTitleAlign: 'left',
          tabBarLabel: TR.classes.classes,
        }} />
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
          ...options,
          headerTitle: TR.exams.exams,
          headerTitleAlign: 'left',
          tabBarLabel: TR.exams.exams,
        }} />
    </Tab.Navigator>
  );
}
