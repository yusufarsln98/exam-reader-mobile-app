import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClassesScreen from '../screens/Classes';
import ExamsScreen from '../screens/Exams';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Classes" component={ClassesScreen} />
            <Tab.Screen name="Exams" component={ExamsScreen} />
        </Tab.Navigator>
    );
};

export default Tabs;