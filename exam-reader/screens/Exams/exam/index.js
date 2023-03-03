import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './styles';


function ExamScreen({ navigation, route }) {
  const { id } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>
          exam screen {id}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ExamScreen;