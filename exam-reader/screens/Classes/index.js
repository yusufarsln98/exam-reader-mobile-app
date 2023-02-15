import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
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

const SearchBar = ({setIsSearch, setSearchWord}) => {
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

const PopOverMenu = ({setShowPopover, setClasses}) => {
  const deleteAllPressed = () => {
    deleteAllClasses();
    setShowPopover(false);
    setClasses(getClasses());
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

const Header = ({ setSearchWord, setClasses, isSearch, setIsSearch, navigation }) => {
  
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const touchable = React.useRef();
  const [showPopover, setShowPopover] = React.useState(false);

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
                <PopOverMenu setShowPopover={setShowPopover} setClasses={setClasses} />
              </Popover>
            </View>
          </>}
    </View>
  );
};

const RightSwipeActions = ( classId, setClasses, navigation ) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_CLASS, { classId })} 
                      style={[styles.swipeAction, { backgroundColor: COLORS.primary }]}>
        <IconEdit color={COLORS.bgColor} />
    </TouchableOpacity>

  );
};
const LeftSwipeActions = (classId, setClasses) => {
  const deletePressed = () => {
    deleteClass(classId);
    setClasses(getClasses());
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
  return (
    <Swipeable
      renderLeftActions={() => LeftSwipeActions( classId, setClasses )}
      renderRightActions={() => RightSwipeActions( classId, setClasses, navigation )}
    >
      <View style={styles.classItem}>
        <Text style={globalStyles.header3}>
          {item.className}
        </Text>
        <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, fontSize: 12 }]}>
          {item.exams.length != 0 ? `${TR.exams.exam_number}: ${item.exams.length}` : `${TR.exams.no_exams}`}
        </Text>
      </View>
    </Swipeable>
  );
};

function ClassesScreen ( {navigation} ) {
    const appContext = React.useContext(AppContext);
    const { userData } = React.useContext(AppContext);
    const [classes, setClasses] = React.useState([]);
    const [searchWord, setSearchWord] = React.useState('');
    const [isSearch, setIsSearch] = React.useState(false);

    // reload page when navigating back to it
    React.useEffect(() => {
      navigation.addListener('focus', () => {
        const classes = getClasses();
        setClasses(classes);
      });
    }, [navigation]);

    // search
    React.useEffect(() => {
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

    return (
      <View onLayout={appContext.onLayoutRootView} style={styles.container}>
          <Header navigation={navigation} 
                  setSearchWord={setSearchWord} 
                  setClasses={setClasses} 
                  isSearch={isSearch} 
                  setIsSearch={setIsSearch} 
          />
          <ScrollView style={styles.classList}>
            {classes.map((item) => (
              <ListItem key={item.id} item={item} navigation={navigation} classId={item.id} setClasses={setClasses} />
            ))}
          </ScrollView>
          {!isSearch &&
              <AddButton onPress={addButtonPressed}/>}
      </View>
    );
};

export default ClassesScreen;