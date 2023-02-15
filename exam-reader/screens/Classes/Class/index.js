import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './styles';


function ClassScreen ( {navigation, route} ) {
    const { theClass } = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{`Class ${theClass.className}`}</Text>
        </View>
      </SafeAreaView>
    );
};

export default ClassScreen;