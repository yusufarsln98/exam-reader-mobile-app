import { getDefaultHeaderHeight } from '@react-navigation/elements';
import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../../../App';
import { globalStyles } from '../../styles';
import { styles } from './styles';
import { COLORS, ROUTES, TR } from '../../../constants';
import { IconClose, IconEdit, IconEllipsisVertical, IconSearch, IconTrash } from '../../../components/icons';
import Popover from 'react-native-popover-view';
import { Input } from "@rneui/base";
import { deleteExamsOfClass, deleteExam, getClass, getExams, getExamsOfClass } from '../../Home/dummy';
import { useFocusEffect } from '@react-navigation/native';
import CostumModal from '../../../components/CostumModal';
import AddButton from '../../../components/AddButton';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';


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

const Header = ({ classId, setSearchWord, isSearch, setIsSearch, showPopover, setShowPopover, setDeleteAllPressed, isExamsSelected }) => {
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
              {`${TR.classes.class.toUpperCase()}`}
            </Text>
            <Text style={[globalStyles.header3, { color: COLORS.primary }]}>
              {` (${getClass(classId).className})`}
            </Text>
          </View>
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


const RightSwipeActions = (item, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_EXAM, { id: item.id, classId: item.classId })}
      style={[globalStyles.swipeAction, { backgroundColor: COLORS.primary }]}>
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
      style={[globalStyles.swipeAction, { backgroundColor: COLORS.red }]}
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
    setExams(getExamsOfClass(item.classId));
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
      renderRightActions={() => RightSwipeActions(item, navigation)}
      containerStyle={{ backgroundColor: COLORS.snow }}
    >
      <TouchableOpacity
        onLongPress={() => setSelected(!selected)}
        onPress={() =>
          selectedExams.length != 0 ? setSelected(!selected) : navigation.navigate(ROUTES.EXAM, { id: item.id, classId: item.classId })
        }
        delayPressIn={50}
      >
        <View style={[globalStyles.listItem, { backgroundColor: selected ? COLORS.snow : COLORS.bgColor }]}>
          <Text style={globalStyles.header3}>
            {item.examName}
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


function ClassScreen({ route, navigation }) {
  const appContext = useContext(AppContext);
  const { userData } = useContext(AppContext);
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [deleteAllPressed, setDeleteAllPressed] = useState(false);
  const [randomKey, setRandomKey] = useState(0);
  const { id } = route.params;

  const onDeletePressed = () => {
    if (selectedExams.length == 0) {
      deleteExamsOfClass(id);
      setExams(getExamsOfClass(id));
      setDeleteAllPressed(false);
    }
    else {
      selectedExams.forEach((item) => {
        deleteExam(item.classId, item.id);
      });
      setExams(getExamsOfClass(id));
      setDeleteAllPressed(false);
      setSelectedExams([]);
    }
  };

  // Refresh page when navigating back to it
  useFocusEffect(
    useCallback(() => {
      const exams = getExamsOfClass(id);
      setExams(exams);
      setRandomKey(Math.random());
    }, [])
  );


  // search
  useEffect(() => {
    const exams = getExamsOfClass(id);
    if (searchWord == '') {
      setExams(exams);
    } else {
      const filteredExams = exams.filter((item) => {
        return item.examName.toLowerCase().includes(searchWord.toLowerCase());
      });
      setExams(filteredExams);
    }
  }, [searchWord]);


  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        classId={id}
        navigation={navigation}
        setSearchWord={setSearchWord}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        setDeleteAllPressed={setDeleteAllPressed}
        isExamsSelected={selectedExams.length != 0}
      />
      <View style={styles.bodyHeaderContainer}>
        <Text style={[globalStyles.header3Bold]}>
          {TR.classes.exams}
        </Text>
      </View>
      <ScrollView key={randomKey}
        style={globalStyles.listContainer}
      >
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

export default ClassScreen;