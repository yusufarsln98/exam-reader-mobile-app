import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TR } from '../../constants';

const Header = ({ navigation }) => {
  
  // default header height
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View style={[styles.header, { height: headerHeight }]}>
      <Text style={styles.headerText}>
        {TR.add_class.add_class}
      </Text>
    </View>
  );
};


function AddClassScreen ({ navigation }) {
    return (
      <View style={""}>
        <Header />
        <View>
          <Text>Add Class Screen</Text>
        </View>
      </View>
    );
};

export default AddClassScreen;