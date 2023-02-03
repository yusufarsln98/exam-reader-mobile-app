import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { COLORS } from "../constants";
import { IconExit } from "./icons";
import { globalStyles } from "../screens/styles";
import { AppContext } from "../App";

function CostumDrawer(props) {
    const appContext = React.useContext(AppContext);

    const handlePress = () => {
        appContext.logout();
        props.navigation.reset({
            index: 0,
            routes: [{ name: "Onboarding" }],
        });    
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Çıkış Yap"
                    // Add icon
                    icon={() => <IconExit color={COLORS.primary} />}
                    labelStyle={{
                        ...globalStyles.header3,
                        color: COLORS.primary,
                        fontWeight: "bold",
                    }}
                    onPress={handlePress}
                />
            </DrawerContentScrollView>
            
        </View>
    );
}

export default CostumDrawer;
