import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from '@rneui/themed';
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, TR } from "../../constants";
import { AppContext } from "../../App";
import OnboardingScreen from "../Onboarding";
import { getClasses, getClass, getAllExams, getExam, getResults, getResult } from "./dummy";
import { styles } from "./styles";
import { globalStyles } from "../styles";
import { HomeScreenDrawer } from "./HomeScreenDrawer";
import { ScrollView } from "react-native-gesture-handler";
import { BackgroundImage } from "@rneui/base";
import * as Linking from 'expo-linking';
import ClassScreen from "../Class";



const FormItem = () => {
  const downloadForm1 = () => {
    Linking.openURL('https://drive.google.com/file/d/140I7DVnfzyACn4rQFK6h0b1-T_mFrZr8/view?usp=sharing');
  };

  const downloadForm2 = () => {
    Linking.openURL('https://drive.google.com/file/d/1_W8ZvwCY45rOWEs0Q0gmlTvLqcCTKF6V/view?usp=sharing');
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <TouchableOpacity onPress={downloadForm1}>
        <View style={styles.itemContainer}>
          <Text style={[globalStyles.paragraph, {textAlign: 'center', textDecorationLine: 'underline'}]}>
            {TR.home.form1}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={downloadForm2}>
        <View style={styles.itemContainer}>
          <Text style={[globalStyles.paragraph, {textAlign: 'center', textDecorationLine: 'underline'}]}>
            {TR.home.form2}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ClassItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CLASS, {theClass: item})}>
      <View style={[styles.itemContainer, {height: 60}]}>
        <Text style={globalStyles.paragraph}>
          {item.className} 
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ExamItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EXAM, {theExam: item})}>
      <View style={[styles.itemContainer]}>
        <Text style={globalStyles.paragraph}>
          {item.examName}
        </Text>
        <Text style={globalStyles.paragraph}>
           {`(${item.className})`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};



export function HomeScreenComponent( {navigation} ) {
  const appContext = React.useContext(AppContext);
  const { userData } = React.useContext(AppContext);

  const [classes, setClasses] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const classes = getClasses();
    setClasses(classes);
    const exams = getAllExams();
    setExams(exams);
  }, []);


  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
        <ScrollView style={styles.contextContainer}>
          <Text style={globalStyles.paragraphLight}>
            {`${userData.fullName}, ${TR.home.welcome} 👋`}
          </Text>

          <View style={[styles.horizontalContainer, {marginTop: 16}]}>
            <Text style={globalStyles.paragraphBold}>
              {TR.home.forms}
            </Text>
            <FormItem />
          </View>
          
          <View style={styles.horizontalContainer}>
            <View style={styles.spacedRow}>
              <Text style={globalStyles.paragraphBold}>
                {TR.classes.classes}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CLASSES)}>
                <Text style={[globalStyles.paragraph, {textDecorationLine: 'underline', fontSize: 12}]}>
                  {TR.home.see_all}
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.classesContainer}>
              {classes.map((item) => {
                return <ClassItem key={item.id} item={item} navigation={navigation} />
              })}
            </ScrollView>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.spacedRow}>
              <Text style={globalStyles.paragraphBold}>
                {TR.exams.exams}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EXAMS)}>
                <Text style={[globalStyles.paragraph, {textDecorationLine: 'underline', fontSize: 12}]}>
                  {TR.home.see_all}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.classesContainer}>
              {exams.map((item) => {
                return <ExamItem key={item.id} item={item} navigation={navigation} />
              })}
            </ScrollView>

          </View>
          <View style={[styles.horizontalContainer, {marginTop: 24}]}>
            <View style={styles.spacedRow}>
              <Text style={globalStyles.paragraphBold}>
                {TR.home.advertisements}
              </Text>
            </View>
          </View>
        </ScrollView>
    </View> 
  );
};



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
      <Stack.Screen
        name={ROUTES.CLASS}
        component={ClassScreen}
        options={ {headerShown: true} }
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;