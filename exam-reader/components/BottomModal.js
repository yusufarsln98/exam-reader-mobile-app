import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal'
import { COLORS, DIMENSIONS } from '../constants';
import { globalStyles } from "../screens/styles";
import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from '@rneui/base';


// modal is closed by swiping down or tapping outside of the modal
// bottom half modal

function BottomModal() {
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const snapPoints = useMemo(() => ['5%', '30%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
    console.log('handleSheetChanges', index);
  }, []);




  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={() => bottomSheetRef.current.expand()} />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        detached={true}
        enablePanDownToClose={true}
      >
        <Button title="Close Bottom Sheet" onPress={() => bottomSheetRef.current.collapse()} />
      </BottomSheet>
    </View >
  )
}

export default BottomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },

});