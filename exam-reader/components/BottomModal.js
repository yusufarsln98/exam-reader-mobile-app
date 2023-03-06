import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, DIMENSIONS } from '../constants';
import { globalStyles } from "../screens/styles";
import BottomSheet from '@gorhom/bottom-sheet';

const BottomModal = ({ children, index, setIndex }) => {
  const snapPoints = useMemo(() => [1, '24'], []);
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      style={{ backgroundColor: 'transparent' }}
      backgroundStyle={{ backgroundColor: COLORS.primary }}
      handleIndicatorStyle={{ backgroundColor: COLORS.bgColor, width: 50 }}
      onChange={index => {
        setIndex(index);
      }}
    >
      {children}
    </BottomSheet >
  );
}

export default BottomModal
