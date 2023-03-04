import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../App';
import { styles } from './styles';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TR } from '../../../constants';
import { globalStyles } from '../../styles';
import { IconClose, IconDownload, IconEdit, IconEye, IconEyeOff, IconSave, IconTrash } from '../../../components/icons';
import { getExam } from '../../Home/dummy';
import BottomModal from '../../../components/BottomModal';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from 'react-native-gesture-handler';

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
          style={{ marginRight: 8, marginTop: -2 }}   // Margin top is to align the icon with the text 
        >
          <IconClose color={COLORS.primary} size={20} />
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
  console.log('left swipe');
  return (
    <View
      style={[styles.swipeAction, { backgroundColor: COLORS.red }]}
    >
      <TouchableOpacity onPress={deletePressed}>
        <IconTrash color={COLORS.bgColor} />
      </TouchableOpacity>
    </View>
  );
};


const RightSwipeActions = (result, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_EXAM, { id: result.id, classId: result.classId })}
      style={[styles.swipeAction, { backgroundColor: COLORS.primary }]}>
      <IconEdit color={COLORS.bgColor} />
    </TouchableOpacity>

  );
};


const ListItem = ({ result, navigation }) => {
  const [deleteItemPressed, setDeleteItemPressed] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <Swipeable
      renderLeftActions={() => LeftSwipeActions(setDeleteItemPressed)}
      renderRightActions={() => RightSwipeActions(result, navigation)}
    >
      <TouchableOpacity>
        <View style={[globalStyles.listItem, { backgroundColor: selected ? COLORS.snow : COLORS.bgColor }]}>
          <Text style={globalStyles.header3}>
            {result.studentFullName}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
};


function ExamScreen({ navigation, route }) {
  const { id, classId } = route.params;
  const appContext = useContext(AppContext);
  const [examData, setExamData] = useState({});
  const [randomKey, setRandomKey] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const exam = getExam(classId, id);
    setExamData(exam);
  }, []);



  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
        examData={examData}
        setModalIndex={setModalIndex}
        modalIndex={modalIndex}
      />
      <View style={styles.bodyHeaderContainer}>
        <Text style={[globalStyles.header3Bold, { color: COLORS.black }]}>
          {TR.exams.results}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // TODO: download exam results
          }}
          style={{ marginRight: 8 }}
        >
          <IconDownload
            color={COLORS.softBlack}
          />
        </TouchableOpacity>
      </View>
      <ScrollView key={randomKey} >
        {examData?.results?.map((result) => (
          <ListItem key={result.id} result={result} navigation={navigation} />
        ))}
      </ScrollView>
      <BottomModal index={modalIndex}>
        <View style={styles.modalContainer}>
          <Text
            style={[globalStyles.header2Bold, { color: COLORS.bgColor }, { alignSelf: 'center' }]}
          >
            Awesome 🎉
          </Text>
        </View>
      </BottomModal>
    </View>
  );
};

export default ExamScreen;