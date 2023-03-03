import React, { useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import { Input } from "@rneui/base";
import { styles } from './styles';
import { AppContext } from "../../../App";
import { deleteAllClasses, deleteClass, getClasses } from '../../Home/dummy';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, ROUTES, TR } from '../../../constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { globalStyles } from '../../styles';
import AddButton from '../../../components/AddButton';
import { IconClose, IconEdit, IconEllipsisVertical, IconSearch, IconTrash } from '../../../components/icons';
import Popover from 'react-native-popover-view';
import { useState } from 'react';
import CostumModal from '../../../components/CostumModal';
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

const Header = ({ setSearchWord, setClasses, isSearch, setIsSearch, navigation, showPopover, setShowPopover, setDeleteAllPressed, isClassesSelected }) => {
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
            {TR.classes.classes_capital}
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


function ClassScreen({ navigation, route }) {
  const appContext = useContext(AppContext);
  const [classes, setClasses] = useState([]);

  const { id } = route.params;
  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Text>{`Class ${id}`}</Text>
    </View>
  );
};

export default ClassScreen;