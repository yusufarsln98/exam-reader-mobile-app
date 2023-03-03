import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TR } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { addClass } from '../Home/dummy';
import { Input } from '@rneui/base';
import { globalStyles } from "../styles";
import { IconCheckmark, IconClose, IconPlusCircle, IconSave } from '../../components/icons';


const Header = ({ navigation }) => {
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View style={[globalStyles.headerContainer, { height: headerHeight }]}>
      <View style={styles.headerTextArea}>
        <Text style={[globalStyles.header2Bold, { color: COLORS.primary }]}>
          {TR.add_class.add_class}
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


function AddClassScreen({ route, navigation }) {
  const [error, setError] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (input.length === 0) {
      setError(true);
    }
    else {
      setError(false);
    }
  }, [input]);


  return (
    <View style={styles.container}>
      <Header
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
              if (!error) {
                addClass(input);
                navigation.pop();
              }
            }}>
              <IconPlusCircle
                color={error ? COLORS.paleGray : COLORS.primary}
              />
            </TouchableOpacity>
          }
          onChangeText={setInput}
          placeholder={TR.classes.class_name_cannot_be_empty}
          placeholderTextColor={COLORS.paleGray}
        >
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

export default AddClassScreen;

