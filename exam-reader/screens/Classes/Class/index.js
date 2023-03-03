import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './styles';


function ClassScreen({ navigation, route }) {
  const { id } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{`Class ${id}`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ClassScreen;