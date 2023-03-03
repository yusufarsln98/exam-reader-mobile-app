import React from 'react'
import { Dimensions, Text, View } from 'react-native';
import Modal from 'react-native-modal'
import { COLORS, DIMENSIONS } from '../constants';
import { globalStyles } from "../screens/styles";


const CostumModal = ({ isVisible, setIsVisible, title, children }) => {
  // get screen width and height
  const { width, height } = Dimensions.get('window');
  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={height + DIMENSIONS.bottom_bar_height}
      onBackdropPress={() => setIsVisible(false)}
      backdropOpacity={0.5}
      animationOut="zoomOut"
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{title}</Text>
          </View>
          <View style={styles.modalBody}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CostumModal

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    ...globalStyles.panel,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modalHeaderText: {
    ...globalStyles.header2Bold,
    color: COLORS.black,
  },
  modalBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};