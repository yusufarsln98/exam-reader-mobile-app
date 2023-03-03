import React from 'react'
import { Text, View } from 'react-native'

function EditExamScreen({ navigation, route }) {
  const { id } = route.params;
  return (
    <View>
      <Text>
        edit exam
      </Text>
    </View>
  )
}

export default EditExamScreen