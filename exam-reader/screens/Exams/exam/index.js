import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../App';
import { styles } from './styles';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TR } from '../../../constants';
import { globalStyles } from '../../styles';
import { IconClose } from '../../../components/icons';
import { getExam } from '../../Home/dummy';
import BottomModal from '../../../components/BottomModal';

const Header = ({ navigation, examData }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View style={[globalStyles.headerContainer, { height: headerHeight }]}>
      <View style={styles.headerTextArea}>
        <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
          {examData.examName}
        </Text>
      </View>
      <TouchableOpacity onPress={() => {
        navigation.pop();
      }}>
        <IconClose color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};


function ExamScreen({ navigation, route }) {
  const { id, classId } = route.params;
  const appContext = useContext(AppContext);
  const [examData, setExamData] = useState({});

  useEffect(() => {
    const exam = getExam(classId, id);
    setExamData(exam);
  }, []);

  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
        examData={examData}
      />
      <Text>
        exam screen {classId}
      </Text>
      <BottomModal />
    </View>
  );
};

export default ExamScreen;