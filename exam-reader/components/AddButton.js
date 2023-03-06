import { Button } from "@rneui/base";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, DIMENSIONS } from "../constants";
import { IconPlus } from "./icons";


function AddButton({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16,
        right: 16,
        shadowColor: COLORS.primary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <IconPlus size={36} color={COLORS.bgColor} />
    </TouchableOpacity>

  );
}

// const styles = StyleSheet.create({
//     addButton: {
//         backgroundColor: COLORS.primary,
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         bottom: 16,
//         right: 16,
//         shadowColor: COLORS.primary,
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
// });


export default AddButton;