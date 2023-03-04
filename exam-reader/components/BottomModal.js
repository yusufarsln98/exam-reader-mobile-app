import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, DIMENSIONS } from '../constants';
import { globalStyles } from "../screens/styles";
import BottomSheet from '@gorhom/bottom-sheet';

const BottomModal = ({ children, index }) => {
  const snapPoints = useMemo(() => ['3%', '30%'], []);
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      style={{ backgroundColor: 'transparent' }}
      backgroundStyle={{ backgroundColor: COLORS.primary }}
      handleIndicatorStyle={{ backgroundColor: COLORS.bgColor, width: 50 }}
    >
      {children}
    </BottomSheet >
  );
}

export default BottomModal
