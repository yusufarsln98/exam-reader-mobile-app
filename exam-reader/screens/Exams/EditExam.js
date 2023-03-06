import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, ROUTES, TR } from '../../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addClass, getClass, getClasses, getExam, updateExam } from '../Home/dummy';
import { Button, Input } from '@rneui/base';
import { globalStyles } from "../styles";
import { IconBack, IconChevronDown, IconClose, IconPlusCircle, IconSearch } from '../../components/icons';
import { AppContext } from '../../App';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';


const Header = ({ navigation }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View style={[globalStyles.headerContainer, { height: headerHeight }]}>
      <TouchableOpacity onPress={() => {
        navigation.pop();
      }}>
        <IconBack color={COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.headerTextArea}>
        <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
          {TR.edit_exam.edit_exam}
        </Text>
      </View>
    </View>
  );
};


function EditExamScreen({ route, navigation }) {
  const appContext = useContext(AppContext);
  const [examName, setExamName] = useState('');
  const [answerKey, setAnswerKey] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [extendClassList, setExtendClassList] = useState(false);
  const [randomKey, setRandomKey] = useState(0);
  const [exam, setExam] = useState({});
  const { id, classId } = route.params;

  const saveExamPressed = () => {
    updateExam(selectedClass, id, examName, answerKey, questionCount);
    navigation.pop();
  };

  useEffect(() => {
    const allClasses = getClasses();
    setClasses(allClasses);
    setExam(getExam(classId, id));
    if (allClasses.length > 0) {
      setSelectedClass(classId);
    }
  }, []);

  useEffect(() => {
    setExamName(exam.examName);
    setAnswerKey(exam.answerKey);
    setQuestionCount(exam.questionCount);
    setSelectedClass(exam.classId);
  }, [exam]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      const allClasses = getClasses();
      setClasses(allClasses);
      setRandomKey(Math.random());
      if (allClasses.length > 0) {
        setSelectedClass(classId);
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (searchInput) {
      const filteredClasses = classes.filter((item) => {
        return item.className.toLowerCase().includes(searchInput.toLowerCase());
      });
      setClasses(filteredClasses);
    } else {
      const allClasses = getClasses();
      setClasses(allClasses);
    }
  }, [searchInput]);


  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
      />
      <View style={[styles.inputItem]}>
        <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, marginLeft: 8 }]}>
          {TR.edit_exam.class_name}
        </Text>
        <View key={randomKey}>
          {(classes.length > 0 || searchInput) ? (
            <>
              {!extendClassList ? (
                // <TouchableWithoutFeedback onPress={() => { setExtendClassList(!extendClassList) }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                  height: 48,
                }}>
                  <Text style={[globalStyles.header3]}>
                    {getClass(selectedClass)?.className}
                  </Text>
                  {/* <TouchableOpacity>
                      <IconChevronDown color={COLORS.primary} />
                    </TouchableOpacity> */}
                </View>
                // </TouchableWithoutFeedback>
              ) : (
                <View>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    height: 48,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                    <Input
                      placeholder={TR.classes.search}
                      rightIcon={
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity onPress={() => {
                            setSearchInput('');
                            setExtendClassList(!extendClassList);
                          }}
                            style={{ marginRight: 8 }}
                          >
                            <IconClose color={COLORS.primary} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setExtendClassList(!extendClassList);
                              navigation.navigate(ROUTES.ADD_CLASS);
                            }}
                          >
                            <IconPlusCircle color={COLORS.primary} />
                          </TouchableOpacity>
                        </View>
                      }
                      containerStyle={styles.searchContainer}
                      inputContainerStyle={styles.searchInput}
                      inputStyle={styles.inputStyle}
                      onChangeText={setSearchInput}
                    />
                  </View>
                </View>
              )}
            </>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 40,
                marginRight: 8,
              }}
            >
              <Text style={[globalStyles.header3, { marginLeft: 8 }]}>
                {TR.edit_exam.no_classes}
              </Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate(ROUTES.ADD_CLASS);
              }}>
                <IconPlusCircle color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {!extendClassList ?
        <>
          <View style={[styles.inputItem]}>
            <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, marginLeft: 8 }]}>
              {TR.edit_exam.exam_name}
            </Text>
            <Input
              autoFocus={true}
              containerStyle={styles.inputContainer}
              style={styles.input}
              onChangeText={setExamName}
              placeholder={TR.edit_exam.exam_name_example}
              children={
                <Text style={[globalStyles.header3]}>
                  {exam?.examName}
                </Text>
              }
            >
            </Input>
          </View>
          <View style={[styles.inputItem]}>
            <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, marginLeft: 8 }]}>
              {TR.edit_exam.answer_key}
            </Text>
            <Input
              containerStyle={styles.inputContainer}
              style={styles.input}
              onChangeText={setAnswerKey}
              placeholder={TR.edit_exam.answer_key_example}
              placeholderTextColor={COLORS.paleGray}
              children={
                <Text style={[globalStyles.header3]}>
                  {exam?.answerKey}
                </Text>
              }
            >
            </Input>
          </View>
          <View style={[styles.inputItem]}>
            <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, marginLeft: 8 }]}>
              {TR.edit_exam.question_count}
            </Text>
            <Input
              containerStyle={styles.inputContainer}
              style={styles.input}
              onChangeText={setQuestionCount}
              placeholder={TR.edit_exam.question_count_example}
              placeholderTextColor={COLORS.paleGray}
              keyboardType="numeric"
              children={
                <Text style={[globalStyles.header3]}>
                  {exam?.questionNumber}
                </Text>
              }
            >
            </Input>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', right: 16 }}>
            <Button buttonStyle={[globalStyles.buttonPrimary, {
              width: 80,
            }]} onPress={saveExamPressed}>
              <Text style={globalStyles.buttonPrimaryTitle}>
                {TR.edit_exam.save}
              </Text>
            </Button>
          </View>
        </> :
        <>
          <View style={[
            {
              height: '20%',
              width: '100%',
              backgroundColor: COLORS.bgColor,
              paddingVertical: 8,
              flexDirection: 'column',
              ...globalStyles.shadow,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }
          ]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {classes.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedClass(item.id);
                      setExtendClassList(false);
                    }}
                    delayPressIn={50}
                  >
                    <View
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                      key={item.id}
                    >
                      <Text style={[globalStyles.header3, {
                        color: item.id === selectedClass ? COLORS.black : COLORS.softBlack,
                        fontFamily: item.id === selectedClass ? 'Poppins-Bold' : 'Poppins-Regular',
                      }]}>
                        {item.className}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
          {/* backdrop */}
          <TouchableWithoutFeedback onPress={() => {
            setSearchInput('');
            setExtendClassList(false);
          }}>
            <View style={{
              height: '100%',
            }} />
          </TouchableWithoutFeedback>
        </>
      }
    </View >
  );
};
export default EditExamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  headerTextArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 24, // default icon size
  },
  inputItem: {
    paddingVertical: 8,
    marginTop: 8,
    borderColor: COLORS.paleGray,
    borderBottomWidth: 1,
  },
  inputItemFocused: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  input: {
    borderBottomWidth: 0,
    marginRight: 24,
  },
  searchContainer: {
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
  },
  searchInput: {
    backgroundColor: COLORS.bgColor,
    borderBottomWidth: 0,
  },
  inputStyle: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: COLORS.inputColor,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: COLORS.black
  },
});


