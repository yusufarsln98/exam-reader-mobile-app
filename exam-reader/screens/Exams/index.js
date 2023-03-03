import { getDefaultHeaderHeight } from '@react-navigation/elements';
import React, { useContext, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../../App';
import { globalStyles } from '../styles';
import { styles } from './styles';
import { COLORS, TR } from '../../constants';
import { IconEllipsisVertical, IconSearch, IconClose } from '../../components/icons';
import Popover from 'react-native-popover-view';
import { Input } from "@rneui/base";
import { deleteAllExams, getAllExams } from '../Home/dummy';
import { useFocusEffect } from '@react-navigation/native';
import CostumModal from '../../components/CostumModal';


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

const PopOverMenu = ({ setShowPopover, setExams, setDeleteAllPressed }) => {
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
          {TR.exams.delete_all}
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

const Header = ({ setSearchWord, setExams, isSearch, setIsSearch, navigation, showPopover, setShowPopover, setDeleteAllPressed }) => {
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
            {TR.exams.exams_capital}
          </Text>
          <View style={styles.headerIconsContainer}>
            <TouchableOpacity onPress={() => setIsSearch(true)}>
              <IconSearch color={COLORS.primary} style={{ marginRight: 16 }} />
            </TouchableOpacity>
            <TouchableOpacity ref={touchable} onPress={() => setShowPopover(true)}>
              <IconEllipsisVertical color={COLORS.primary} />
            </TouchableOpacity>
            <Popover from={touchable} isVisible={showPopover} onRequestClose={() => setShowPopover(false)} placement="bottom" popoverStyle={styles.popover}>
              <PopOverMenu setShowPopover={setShowPopover} setExams={setExams} setDeleteAllPressed={setDeleteAllPressed} />
            </Popover>
          </View>
        </>}
    </View>
  );
};


function ExamsScreen({ navigation }) {
  const appContext = useContext(AppContext);
  const { userData } = useContext(AppContext);
  const [exams, setExams] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [deleteAllPressed, setDeleteAllPressed] = useState(false);
  const [randomKey, setRandomKey] = useState(0);

  const onDeletePressed = () => {
    deleteAllExams();
    setExams(getAllExams());
    setDeleteAllPressed(false);
  };

  // Refresh page when navigating back to it
  useFocusEffect(
    useCallback(() => {
      const classes = getAllExams();
      setExams(classes);
      setRandomKey(Math.random());
    }, [])
  );

  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        navigation={navigation}
        setSearchWord={setSearchWord}
        setExams={setExams}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        setDeleteAllPressed={setDeleteAllPressed}
      />
      <Text>exams screen</Text>

      <CostumModal
        isVisible={deleteAllPressed}
        setIsVisible={setDeleteAllPressed}
        title={TR.exams.delete_all}
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