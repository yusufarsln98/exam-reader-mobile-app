import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TR } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { getClass, updateClass } from '../Home/dummy';
import { Input } from '@rneui/base';
import { globalStyles } from "../styles";
import { IconBack, IconCheckmark, IconClose, IconSave } from '../../components/icons';
import { AppContext } from '../../App';


const Header = ({ classData, navigation }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View style={[globalStyles.headerContainer, { height: headerHeight }]}>
      <TouchableOpacity onPress={() => {
        navigation.pop();
      }}>
        <IconBack color={COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.headerTextArea}>
        <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
          {TR.edit_class.edit_class}
        </Text>
      </View>
    </View>
  );
};


function EditClassScreen({ route, navigation }) {
  const [classData, setClassData] = useState(null);
  const { id } = route.params;
  const [error, setError] = useState(true);
  const [input, setInput] = useState('');
  const appContext = useContext(AppContext);

  useEffect(() => {
    setClassData(getClass(id));
  }, []);

  useEffect(() => {
    if (input.length === 0) {
      setError(true);
    }
    else {
      setError(false);
    }
  }, [input]);


  return (
    <View onLayout={appContext.onLayoutRootView} style={styles.container}>
      <Header
        classData={classData}
        navigation={navigation}
      />
      <View style={[styles.inputItem]}>
        <Text style={[globalStyles.paragraph, { color: COLORS.softBlack, marginLeft: 8 }]}>
          {TR.edit_class.class_name}
        </Text>
        <Input
          autoFocus={true}
          containerStyle={styles.inputContainer}
          style={styles.input}
          rightIcon={
            <TouchableOpacity onPress={() => {
              // buraya tekrar bak
              !error ? updateClass(id, input) || navigation.pop() : null;
            }}>
              <IconCheckmark
                color={error ? COLORS.paleGray : COLORS.primary}
              />
            </TouchableOpacity>
          }
          onChangeText={setInput}
          placeholder={TR.edit_class.class_name_required}
          placeholderTextColor={COLORS.paleGray}
        >
          <Text style={globalStyles.header3}>
            {classData?.className}
          </Text>
        </Input>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  headerTextArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    marginRight: 24,
  },
  inputItem: {
    paddingVertical: 8,
    marginTop: 8,
    borderColor: COLORS.paleGray,
    borderBottomWidth: 1,
  },
  inputItemFocused: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  input: {
    borderBottomWidth: 0,
    borderColor: COLORS.red,
    marginRight: 24,
  },
});

export default EditClassScreen;

