import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, ROUTES, TR } from "../../constants";
import { globalStyles } from "../styles";
import AboutScreen from "../About";
import { IconInfo } from "../../components/icons";
import LogoDark from "../../components/icons/LogoDark";
import CostumDrawer from "../../components/CostumDrawer";
import { HomeScreenTab } from "./HomeScreenTab";

export function HomeScreenDrawer() {
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
  };

  return (
    <Drawer.Navigator initialRouteName={ROUTES.HOME_BOTTOM_TABS} drawerContent={props => <CostumDrawer {...props} />}>
      <Drawer.Screen
        name={ROUTES.HOME_BOTTOM_TABS}
        component={HomeScreenTab}
        options={{
          ...options,
          drawerLabel: TR.home.home,
          drawerIcon: () => <LogoDark />
        }} />
      <Drawer.Screen
        name={ROUTES.ABOUT}
        component={AboutScreen}
        options={{
          ...options,
          drawerLabel: TR.about.about,
          drawerIcon: () => <IconInfo color={COLORS.primary} />
        }} />
    </Drawer.Navigator>
  );
}
