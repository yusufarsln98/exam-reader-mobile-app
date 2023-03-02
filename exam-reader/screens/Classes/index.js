import React, { useEffect, useContext, useRef } from 'react';
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

const PopOverMenu = ({ setShowPopover, setClasses, setDeleteAllPressed }) => {
  const deleteAllPressed = () => {
    // deleteAllClasses();
    setShowPopover(false);
    // setClasses(getClasses());
    setDeleteAllPressed(true);
  };
  return (
    <>
      <TouchableOpacity onPress={deleteAllPressed}>
        <Text
          style={[globalStyles.paragraph, { color: COLORS.red }]}
        >
          {TR.classes.delete_all}
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

const Header = ({ setSearchWord, setClasses, isSearch, setIsSearch, navigation, showPopover, setShowPopover, setDeleteAllPressed }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const touchable = useRef();

  return (
    <View style={[styles.header, { height: headerHeight }]}>
      {isSearch ?
        <SearchBar setIsSearch={setIsSearch} setSearchWord={setSearchWord} /> :
        <>
          <Text style={styles.headerText}>
            {TR.classes.classes_capital}
          </Text>
          <View style={styles.headerIconsContainer}>
            <TouchableOpacity onPress={() => setIsSearch(true)}>
              <IconSearch color={COLORS.primary} style={{ marginRight: 16 }} />
            </TouchableOpacity>
            <TouchableOpacity ref={touchable} onPress={() => setShowPopover(true)}>
              <IconEllipsisVertical color={COLORS.primary} />
            </TouchableOpacity>
            <Popover from={touchable} isVisible={showPopover} onRequestClose={() => setShowPopover(false)} placement="bottom" popoverStyle={styles.popover}>
              <PopOverMenu setShowPopover={setShowPopover} setClasses={setClasses} setDeleteAllPressed={setDeleteAllPressed} />
            </Popover>
          </View>
        </>}
    </View>
  );
};

const RightSwipeActions = (classId, setClasses, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_CLASS, { classId })}
      style={[styles.swipeAction, { backgroundColor: COLORS.primary }]}>
      <IconEdit color={COLORS.bgColor} />
    </TouchableOpacity>

  );
};

const LeftSwipeActions = (classId, setClasses, setDeleteItemPressed) => {
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

const ListItem = ({ item, navigation, classId, setClasses }) => {
  const [deleteItemPressed, setDeleteItemPressed] = useState(false);
  const onDeletePressed = () => {
    deleteClass(classId);
    setClasses(getClasses());
    setDeleteItemPressed(false);
  };

  return (
    <Swipeable
      renderLeftActions={() => LeftSwipeActions(classId, setClasses, setDeleteItemPressed)}
      renderRightActions={() => RightSwipeActions(classId, setClasses, navigation)}
    >
      <View style={styles.classItem}>
        <Text style={globalStyles.header3}>
          {item.className}
        </Text>
        <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, fontSize: 12 }]}>
          {item.exams.length != 0 ? `${TR.exams.exam_number}: ${item.exams.length}` : `${TR.exams.no_exams}`}
        </Text>
      </View>
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
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [deleteAllPressed, setDeleteAllPressed] = useState(false);

  // reload page when navigating back to it
  useEffect(() => {
    navigation.addListener('focus', () => {
      const classes = getClasses();
      setClasses(classes);
    });
  }, [navigation]);

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
    console.log('add button pressed');
    navigation.navigate(ROUTES.ADD_CLASS);
  };

  const onDeletePressed = () => {
    deleteAllClasses();
    setClasses(getClasses());
    setDeleteAllPressed(false);
  };


  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
        setSearchWord={setSearchWord}
        setClasses={setClasses}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        setDeleteAllPressed={setDeleteAllPressed}
      />
      <ScrollView style={styles.classList}>
        {classes.map((item) => (
          <ListItem key={item.id} item={item} navigation={navigation} classId={item.id} setClasses={setClasses} />
        ))}
      </ScrollView>
      {!isSearch && <AddButton onPress={addButtonPressed} />}
      <CostumModal
        isVisible={deleteAllPressed}
        setIsVisible={setDeleteAllPressed}
        title={TR.classes.delete_all}
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