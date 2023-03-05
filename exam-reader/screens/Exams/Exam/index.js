import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../App';
import { styles } from './styles';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TR } from '../../../constants';
import { globalStyles } from '../../styles';
import { IconClose, IconDownload, IconEdit, IconEye, IconEyeOff, IconTrash, IconBack } from '../../../components/icons';
import { deleteResult, getClass, getExam } from '../../Home/dummy';
import BottomModal from '../../../components/BottomModal';
import { Swipeable, ScrollView } from 'react-native-gesture-handler';
import CostumModal from '../../../components/CostumModal';

const Header = ({ navigation, examData, setModalIndex, modalIndex }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View style={[globalStyles.headerContainer, { height: headerHeight, backgroundColor: COLORS.bgColor }]}>
      <View style={styles.headerTextContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={{ marginRight: 12, marginTop: -3 }}   // Margin top is to align the icon with the text 
        >
          <IconBack color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
          {TR.exams.exam}
        </Text>
        <Text style={[globalStyles.header3, { color: COLORS.primary }]}>
          {` (${examData.examName})`}
        </Text>
      </View>
      <View flexDirection="row">
        <TouchableOpacity onPress={() => {
          setModalIndex(modalIndex === 0 ? 1 : 0);
        }}>
          {modalIndex === 0 ?
            <IconEye color={COLORS.primary} />
            :
            <IconEyeOff color={COLORS.primary} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};


const LeftSwipeActions = (setDeleteItemPressed) => {
  const deletePressed = () => {
    setDeleteItemPressed(true);
  };
  return (
    <View
      style={[globalStyles.swipeAction, { backgroundColor: COLORS.red }]}
    >
      <TouchableOpacity onPress={deletePressed}>
        <IconTrash color={COLORS.bgColor} />
      </TouchableOpacity>
    </View>
  );
};



const ListItem = ({ result, classId, examId, navigation, selectedResults, setSelectedResults, setExamData }) => {
  const [deleteItemPressed, setDeleteItemPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showStudentAnswers, setShowStudentAnswers] = useState(false);

  const onLongPressed = () => {
    setSelected(!selected);
  };

  const onPressed = () => {
    if (selectedResults.length != 0) {
      setSelected(!selected);
    }
    else {
      setShowStudentAnswers(!showStudentAnswers);
    }
  };

  useEffect(() => {
    if (selected) {
      setSelectedResults([...selectedResults, result]);
    } else {
      setSelectedResults(selectedResults.filter(item => item.id !== result.id));
    }
  }, [selected]);

  const onDeletePressed = () => {
    deleteResult(classId, examId, result.id);
    setExamData(getExam(classId, examId));
  };


  return (
    <Swipeable
      renderLeftActions={() => LeftSwipeActions(setDeleteItemPressed)}
      renderRightActions={() => null}
      containerStyle={{ backgroundColor: COLORS.snow }}
    >
      <TouchableOpacity
        onLongPress={onLongPressed}
        onPress={onPressed}
        delayPressIn={50}
      >
        <View
          style={[globalStyles.listItem, {
            backgroundColor: selected ? COLORS.snow : COLORS.bgColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
          }]}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={globalStyles.header3}>
              {`${result.studentFullName}`}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={globalStyles.paragraph}>
                {`${TR.exams.number}: `}
              </Text>
              <Text style={globalStyles.paragraph}>
                {`${result.studentNumber}`}
              </Text>
            </View>
            {showStudentAnswers &&
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={globalStyles.paragraph}>
                  {`${TR.exams.answers}: `}
                </Text>
                <Text style={globalStyles.paragraph}>
                  {`${result.studentAnswers}`}
                </Text>
              </View>}
          </View>
          <Text style={globalStyles.header2}>
            {`${result.grade}`}
          </Text>
        </View>
      </TouchableOpacity>
      <CostumModal
        isVisible={deleteItemPressed}
        setIsVisible={setDeleteItemPressed}
        title={TR.exams.delete_result}
      >
        <TouchableOpacity onPress={onDeletePressed}>
          <Text style={[globalStyles.paragraph, { color: COLORS.red }]}>
            {TR.exams.approve}
          </Text>
        </TouchableOpacity>
      </CostumModal>
    </Swipeable>
  )
};


function ExamScreen({ navigation, route }) {
  const { id, classId } = route.params;
  const appContext = useContext(AppContext);
  const [examData, setExamData] = useState({});
  const [randomKey, setRandomKey] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [deleteSelectedPressed, setDeleteSelectedPressed] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);

  useEffect(() => {
    const exam = getExam(classId, id);
    setExamData(exam);
  }, []);

  const onDeletePressed = () => {
    selectedResults.forEach(result => {
      deleteResult(classId, id, result.id);
    });
    setExamData(getExam(classId, id));
    setSelectedResults([]);
    setDeleteSelectedPressed(false);
  };

  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
        examData={examData}
        setModalIndex={setModalIndex}
        modalIndex={modalIndex}
      />
      <View style={styles.bodyHeaderContainer}>
        <Text style={[globalStyles.header3Bold]}>
          {TR.exams.results}
        </Text>
        <TouchableOpacity
          onPress={() => {
            selectedResults.length != 0 ? setDeleteSelectedPressed(!deleteSelectedPressed) : "";
          }}
          style={{ marginRight: 8 }}
        >
          <Text style={[globalStyles.paragraphSmall, { color: selectedResults.length != 0 ? COLORS.red : COLORS.primary }]}>
            {selectedResults.length != 0 ? TR.exams.delete_selected : TR.exams.export}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView key={randomKey}>
        {examData?.results?.map((result) => (
          <ListItem
            key={result.id}
            classId={examData.classId}
            examId={examData.id}
            result={result}
            navigation={navigation}
            selectedResults={selectedResults}
            setSelectedResults={setSelectedResults}
            setExamData={setExamData}
          />
        ))}
      </ScrollView>
      <CostumModal
        isVisible={deleteSelectedPressed}
        setIsVisible={setDeleteSelectedPressed}
        title={TR.exams.delete_selected}
      >
        <TouchableOpacity onPress={onDeletePressed}>
          <Text style={[globalStyles.paragraph, { color: COLORS.red }]}>
            {TR.exams.approve}
          </Text>
        </TouchableOpacity>
      </CostumModal>
      <BottomModal index={modalIndex} setIndex={setModalIndex}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[globalStyles.header3, { color: COLORS.inputColor }]}
            >
              {`${TR.exams.class}: `}
            </Text>
            <Text
              style={[globalStyles.header2, { color: COLORS.bgColor }]}
            >
              {getClass(examData?.classId)?.className}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[globalStyles.header3, { color: COLORS.inputColor }]}
            >
              {`${TR.exams.exam}: `}
            </Text>
            <Text
              style={[globalStyles.header2, { color: COLORS.bgColor }]}
            >
              {`${examData?.examName}`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[globalStyles.header3, { color: COLORS.inputColor }]}
            >
              {`${TR.exams.answer_key}: `}
            </Text>
            <ScrollView horizontal={true} style={{ width: '100%' }}>
              <Text
                style={[globalStyles.header2, { color: COLORS.bgColor }]}
              >
                {`${examData?.answerKey}`}
              </Text>
            </ScrollView>
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

export default ExamScreen;