import { getDefaultHeaderHeight } from '@react-navigation/elements';
import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../../App';
import { globalStyles } from '../styles';
import { styles } from './styles';
import { COLORS, ROUTES, TR } from '../../constants';
import { IconClose, IconEdit, IconEllipsisVertical, IconSearch, IconTrash } from '../../components/icons';
import Popover from 'react-native-popover-view';
import { Input } from "@rneui/base";
import { deleteAllExams, deleteExam, getClass, getExams } from '../Home/dummy';
import { useFocusEffect } from '@react-navigation/native';
import CostumModal from '../../components/CostumModal';
import AddButton from '../../components/AddButton';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const SearchBar = ({ setIsSearch, setSearchWord }) => {
  const onPressClose = () => {
    setIsSearch(false);
    setSearchWord('');
  };
  return (
    <>
      <Input
        placeholder={TR.exams.search}
        leftIcon={<IconSearch color={COLORS.softBlack} />}
        leftIconContainerStyle={{ marginRight: 8 }}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        inputStyle={styles.inputStyle}
        onChangeText={setSearchWord}
        autoFocus={true}
      />
      <TouchableOpacity onPress={onPressClose}>
        <IconClose color={COLORS.primary} size={24} />
      </TouchableOpacity>
    </>
  );
};

const PopOverMenu = ({ setShowPopover, setDeleteAllPressed, isExamsSelected }) => {
  const deleteAllPressed = () => {
    setShowPopover(false);
    setDeleteAllPressed(true);
  };
  return (
    <>
      <TouchableOpacity onPress={deleteAllPressed}>
        <Text
          style={[globalStyles.paragraph, { color: COLORS.red }]}
        >
          {isExamsSelected ? TR.exams.delete_selected : TR.exams.delete_all}
        </Text>
      </TouchableOpacity>
      <Text
        style={[globalStyles.paragraph, { color: COLORS.red, fontSize: 12 }]}
      >
        {`(${TR.exams.delete_all_warning})`}
      </Text>
    </>
  );
};

const Header = ({ setSearchWord, isSearch, setIsSearch, showPopover, setShowPopover, setDeleteAllPressed, isExamsSelected }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const touchable = useRef();

  return (
    <View style={[globalStyles.headerContainer, { height: headerHeight }]}>
      {isSearch ?
        <SearchBar setIsSearch={setIsSearch} setSearchWord={setSearchWord} /> :
        <>
          <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
            {TR.exams.exams.toUpperCase()}
          </Text>
          <View style={styles.headerIconsContainer}>
            <TouchableOpacity onPress={() => setIsSearch(true)}>
              <IconSearch color={COLORS.primary} style={{ marginRight: 16 }} />
            </TouchableOpacity>
            <TouchableOpacity ref={touchable} onPress={() => setShowPopover(true)}>
              <IconEllipsisVertical color={COLORS.primary} />
            </TouchableOpacity>
            <Popover
              from={touchable}
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}
              placement="bottom"
              popoverStyle={styles.popover}
            >
              <PopOverMenu
                setShowPopover={setShowPopover}
                setDeleteAllPressed={setDeleteAllPressed}
                isExamsSelected={isExamsSelected}
              />
            </Popover>
          </View>
        </>}
    </View>
  );
};


const RightSwipeActions = (examId, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_EXAM, { id: examId })}
      style={[styles.swipeAction, { backgroundColor: COLORS.primary }]}>
      <IconEdit color={COLORS.bgColor} />
    </TouchableOpacity>

  );
};

const LeftSwipeActions = (setDeleteItemPressed) => {
  const deletePressed = () => {
    setDeleteItemPressed(true);
  };
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

const ListItem = ({ item, navigation, setExams, selectedExams }) => {
  const [deleteItemPressed, setDeleteItemPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const [classData, setClassData] = useState({});

  const onDeletePressed = () => {
    deleteExam(item.classId, item.id);
    setExams(getExams());
    setDeleteItemPressed(false);
  };

  useEffect(() => {
    const classData = getClass(item.classId);
    setClassData(classData);
  }, []);

  useEffect(() => {
    if (selected) {
      selectedExams.push({ classId: item.classId, id: item.id })
    } else {
      const index = selectedExams.findIndex((exam) => exam.id == item.id);
      selectedExams.splice(index, 1);
    }
  }, [selected]);


  return (
    <Swipeable
      renderLeftActions={() => LeftSwipeActions(setDeleteItemPressed)}
      renderRightActions={() => RightSwipeActions(item.id, navigation)}
    >
      <TouchableOpacity
        onLongPress={() => setSelected(!selected)}
        onPress={() =>
          selectedExams.length != 0 ? setSelected(!selected) : navigation.navigate(ROUTES.EXAM, { id: item.id })
        }
        delayPressIn={50}
      >
        <View style={[globalStyles.listItem, { backgroundColor: selected ? COLORS.snow : COLORS.bgColor }]}>
          <Text style={globalStyles.header3}>
            {item.examName}
          </Text>
          <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, fontSize: 12 }]}>
            {`(${classData.className})`}
          </Text>
        </View>
      </TouchableOpacity>
      <CostumModal
        setIsVisible={setDeleteItemPressed}
        isVisible={deleteItemPressed}
        title={TR.exams.delete_exam}
      >
        <TouchableOpacity onPress={onDeletePressed}>
          <Text style={[globalStyles.paragraph, { color: COLORS.red }]}>
            {TR.exams.approve}
          </Text>
        </TouchableOpacity>
      </CostumModal>
    </Swipeable>
  );
};


function ExamsScreen({ navigation }) {
  const appContext = useContext(AppContext);
  const { userData } = useContext(AppContext);
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [deleteAllPressed, setDeleteAllPressed] = useState(false);
  const [randomKey, setRandomKey] = useState(0);


  const onDeletePressed = () => {
    if (selectedExams.length == 0) {
      deleteAllExams();
      setExams(getExams());
      setDeleteAllPressed(false);
    }
    else {
      selectedExams.forEach((item) => {
        deleteExam(item.classId, item.id);
      });
      setExams(getExams());
      setDeleteAllPressed(false);
      setSelectedExams([]);
    }
  };
  // Refresh page when navigating back to it
  useFocusEffect(
    useCallback(() => {
      const exams = getExams();
      setExams(exams);
      setRandomKey(Math.random());
    }, [])
  );

  // search
  useEffect(() => {
    const exams = getExams();
    if (searchWord == '') {
      setExams(getExams());
    } else {
      const filteredExams = exams.filter((item) => {
        return item.examName.toLowerCase().includes(searchWord.toLowerCase());
      });
      setExams(filteredExams);
    }
  }, [searchWord]);

  const addButtonPressed = () => {
    navigation.navigate(ROUTES.ADD_EXAM);
  };

  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
        setSearchWord={setSearchWord}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        setDeleteAllPressed={setDeleteAllPressed}
        isExamsSelected={selectedExams.length != 0}
      />
      <ScrollView key={randomKey}>
        {exams?.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            navigation={navigation}
            setExams={setExams}
            selectedExams={selectedExams}
          />
        ))}
      </ScrollView>
      {!isSearch && <AddButton onPress={addButtonPressed} />}
      <CostumModal
        isVisible={deleteAllPressed}
        setIsVisible={setDeleteAllPressed}
        title={selectedExams.length == 0 ? TR.exams.delete_all : TR.exams.delete_selected}
      >
        <TouchableOpacity onPress={onDeletePressed}>
          <Text style={[globalStyles.paragraph, { color: COLORS.red }]}>
            {TR.exams.approve}
          </Text>
        </TouchableOpacity>
      </CostumModal>
    </View>
  );
};

export default ExamsScreen;