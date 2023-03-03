import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal'
import { COLORS, DIMENSIONS } from '../constants';
import { globalStyles } from "../screens/styles";



// modal is closed by swiping down or tapping outside of the modal
// bottom half modal

function BottomModal() {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.modalOpener} >
        <View
          style={styles.line}
        >

        </View>
      </View>
    </View >
  )
}

export default BottomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOpener: {
    width: '100%',
    height: 24,
    backgroundColor: COLORS.snow,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    margin: 'auto',
    // add shadow to the top of the modal
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line: {
    width: '20%',
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
});