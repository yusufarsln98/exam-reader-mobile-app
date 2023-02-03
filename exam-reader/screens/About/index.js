import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './styles';


function AboutScreen () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>About</Text>
      </SafeAreaView>
    );
};

export default AboutScreen;