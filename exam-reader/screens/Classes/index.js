import React, { useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import { Input } from "@rneui/base";
import { styles } from './styles';
import { AppContext } from "../../App";
import { deleteAllClasses, deleteClass, getClasses } from '../Home/dummy';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, ROUTES, TR } from '../../constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { globalStyles } from '../styles';
import AddButton from '../../components/AddButton';
import { IconClose, IconEdit, IconEllipsisVertical, IconSearch, IconTrash } from '../../components/icons';
import Popover from 'react-native-popover-view';
import { useState } from 'react';
import CostumModal from '../../components/CostumModal';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


const SearchBar = ({ setIsSearch, setSearchWord }) => {
  const onPressClose = () => {
    setIsSearch(false);
    setSearchWord('');
  };
  return (
    <>
      <Input
        placeholder={TR.classes.search}
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

const PopOverMenu = ({ setShowPopover, setDeleteAllPressed, isClassesSelected }) => {
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
          {isClassesSelected ? TR.classes.delete_selected : TR.classes.delete_all}
        </Text>
      </TouchableOpacity>
      <Text
        style={[globalStyles.paragraph, { color: COLORS.red, fontSize: 12 }]}
      >
        {`(${TR.classes.delete_all_warning})`}
      </Text>
    </>
  );
};

const Header = ({ setSearchWord, isSearch, setIsSearch, showPopover, setShowPopover, setDeleteAllPressed, isClassesSelected }) => {
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
            {TR.classes.classes.toUpperCase()}
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
                isClassesSelected={isClassesSelected}
              />
            </Popover>
          </View>
        </>}
    </View>
  );
};

const RightSwipeActions = (classId, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_CLASS, { id: classId })}
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

const ListItem = ({ item, navigation, setClasses, selectedClasses }) => {
  const [deleteItemPressed, setDeleteItemPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const onDeletePressed = () => {
    deleteClass(item.id);
    setClasses(getClasses());
    setDeleteItemPressed(false);
  };

  useEffect(() => {
    if (selected) {
      selectedClasses.push(item.id);
    } else {
      const index = selectedClasses.indexOf(item.id);
      selectedClasses.splice(index, 1);
    }
  }, [selected]);

  return (
    <Swipeable
      renderLeftActions={() => LeftSwipeActions(setDeleteItemPressed)}
      renderRightActions={() => RightSwipeActions(item.id, navigation)}
      containerStyle={{ backgroundColor: COLORS.snow }}
    >
      <TouchableOpacity
        onLongPress={() => setSelected(!selected)}
        onPress={() =>
          selectedClasses.length != 0 ? setSelected(!selected) : navigation.navigate(ROUTES.CLASS, { id: item.id })
        }
        delayPressIn={50}
      >
        <View style={[globalStyles.listItem, { backgroundColor: selected ? COLORS.snow : COLORS.bgColor }]}>
          <Text style={globalStyles.header3}>
            {item.className}
          </Text>
          <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, fontSize: 12 }]}>
            {item.exams.length != 0 ? `${TR.exams.exam_number}: ${item.exams.length}` : `${TR.exams.no_exams}`}
          </Text>
        </View>
      </TouchableOpacity>
      <CostumModal
        setIsVisible={setDeleteItemPressed}
        isVisible={deleteItemPressed}
        title={TR.classes.delete_class}
      >
        <TouchableOpacity onPress={onDeletePressed}>
          <Text style={[globalStyles.paragraph, { color: COLORS.red }]}>
            {TR.classes.approve}
          </Text>
        </TouchableOpacity>
      </CostumModal>
    </Swipeable>
  );
};

function ClassesScreen({ navigation }) {
  const appContext = useContext(AppContext);
  const { userData } = useContext(AppContext);
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [deleteAllPressed, setDeleteAllPressed] = useState(false);
  const [randomKey, setRandomKey] = useState(0);

  // search
  useEffect(() => {
    const classes = getClasses();
    if (searchWord == '') {
      setClasses(classes);
    } else {
      const filteredClasses = classes.filter((item) => {
        return item.className.toLowerCase().includes(searchWord.toLowerCase());
      });
      setClasses(filteredClasses);
    }
  }, [searchWord]);

  const addButtonPressed = () => {
    navigation.navigate(ROUTES.ADD_CLASS);
  };

  const onDeletePressed = () => {
    if (selectedClasses.length == 0) {
      deleteAllClasses();
      setClasses(getClasses());
      setDeleteAllPressed(false);
    }
    else {
      selectedClasses.forEach((item) => {
        deleteClass(item);
      });
      setClasses(getClasses());
      setDeleteAllPressed(false);
      setSelectedClasses([]);
    }
  };

  // Refresh page when navigating back to it
  useFocusEffect(
    useCallback(() => {
      const classes = getClasses();
      setClasses(classes);
      setRandomKey(Math.random());
    }, [])
  );

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
        isClassesSelected={selectedClasses.length != 0}
      />
      <ScrollView key={randomKey}
        style={globalStyles.listContainer}
      >
        {classes?.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            navigation={navigation}
            classId={item.id}
            setClasses={setClasses}
            selectedClasses={selectedClasses}
          />
        ))}
      </ScrollView>
      {!isSearch && <AddButton onPress={addButtonPressed} />}
      <CostumModal
        isVisible={deleteAllPressed}
        setIsVisible={setDeleteAllPressed}
        title={selectedClasses.length == 0 ? TR.classes.delete_all : TR.classes.delete_selected}
      >
        <TouchableOpacity onPress={onDeletePressed}>
          <Text style={[globalStyles.paragraph, { color: COLORS.red }]}>
            {TR.classes.approve}
          </Text>
        </TouchableOpacity>
      </CostumModal>
    </View>
  );
};

export default ClassesScreen;