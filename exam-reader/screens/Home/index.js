import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, ROUTES, TR } from "../../constants";
import { AppContext } from "../../App";
import OnboardingScreen from "../Onboarding";
import { getClasses, getClass, getAllExams, getExam, getResults, getResult } from "./dummy";
import { styles } from "./styles";
import { globalStyles } from "../styles";
import { HomeScreenDrawer } from "./HomeScreenDrawer";
import { ScrollView } from "react-native-gesture-handler";
import { BackgroundImage } from "@rneui/base";
import * as Linking from 'expo-linking';
import ClassScreen from "../Classes/Class";
import { IconPlus } from "../../components/icons";
import EditClassScreen from "../Classes/EditClass";
import AddClassScreen from "../Classes/AddClass";


const AddItem = ({ navigation, theRoute, height }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(theRoute)}>
      <View style={[styles.itemContainer, { height: height, width: 60, paddingHorizontal: 0, backgroundColor: COLORS.inputColor }]}>
        <IconPlus size={36} color={COLORS.softBlack} />
      </View>
    </TouchableOpacity>
  );
};


const Forms = () => {
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
          <Text style={[globalStyles.paragraph, { textAlign: 'center', textDecorationLine: 'underline' }]}>
            {`${TR.home.form1}` + '\n' + `${TR.home.google_drive}`}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={downloadForm2}>
        <View style={styles.itemContainer}>
          <Text style={[globalStyles.paragraph, { textAlign: 'center', textDecorationLine: 'underline' }]}>
            {`${TR.home.form2}` + '\n' + `${TR.home.google_drive}`}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ClassItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CLASS, { theClass: item })}>
      <View style={[styles.itemContainer, { height: 60 }]}>
        <Text style={globalStyles.paragraph}>
          {item.className}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ExamItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EXAM, { theExam: item })}>
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


export function HomeScreenComponent({ navigation }) {
  const appContext = React.useContext(AppContext);
  const { userData } = React.useContext(AppContext);

  const [classes, setClasses] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [results, setResults] = React.useState([]);


  // reload page when navigating back to it
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      const classes = getClasses();
      setClasses(classes);
      const exams = getAllExams();
      setExams(exams);
    });
  }, [navigation]);

  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <ScrollView style={styles.contextContainer}>
        <Text style={[globalStyles.paragraph, { marginTop: 8 }]}>
          {`${userData.fullName}, ${TR.home.welcome} 👋`}
        </Text>
        <View style={[styles.horizontalContainer, { marginTop: 16 }]}>
          <Text style={globalStyles.paragraphBold}>
            {TR.home.forms}
          </Text>
          <Forms />
        </View>

        <View style={styles.horizontalContainer}>
          <View style={styles.spacedRow}>
            <Text style={globalStyles.paragraphBold}>
              {TR.classes.classes}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CLASSES)}>
              <Text style={[globalStyles.paragraph, { fontSize: 12 }]}>
                {TR.home.see_all}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {<AddItem theRoute={ROUTES.CLASSES} navigation={navigation} height={60} />}
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
              <Text style={[globalStyles.paragraph, { fontSize: 12 }]}>
                {TR.home.see_all}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {<AddItem theRoute={ROUTES.EXAMS} navigation={navigation} height={100} />}
            {exams.map((item) => {
              return <ExamItem key={item.id} item={item} navigation={navigation} />
            })}
          </ScrollView>
        </View>
        <View style={[styles.horizontalContainer]}>
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ONBOARDING}
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CLASS}
        component={ClassScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_CLASS}
        component={EditClassScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ADD_CLASS}
        component={AddClassScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;