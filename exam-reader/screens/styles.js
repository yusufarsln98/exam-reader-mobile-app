// Global style objects
import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export const globalStyles = StyleSheet.create({
    panel: {
        backgroundColor: COLORS.bgColor,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    header: {
        fontFamily: "Poppins-Medium",
        fontSize: 30,
        color: COLORS.bgColor,
    },
    header1: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: COLORS.bgColor,
    },
    header2: {
        fontFamily: "Poppins-Regular",
        fontSize: 18,
        color: COLORS.black,
    },
    header3: {
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        color: COLORS.black,
    },
    paragraph: {
        fontFamily: "Poppins-Light",
        fontSize: 14,
    },
    buttonPrimary: {
        marginTop: 10,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 5,
    },
    buttonPrimaryTitle: {
      color: COLORS.bgColor,
      fontSize: 16,
      letterSpacing: 0.25,
      fontFamily: 'Poppins-Regular',
    },
    buttonSecondary: {
        marginTop: 10,
        backgroundColor: COLORS.bgColor,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 5,
    },
    buttonSecondaryTitle: {
        color: COLORS.primary,
        fontSize: 16,
        letterSpacing: 0.25,
        fontFamily: 'Poppins-Regular',
    },
    inputContainerStyle: {
        borderRadius: 5,
        backgroundColor: COLORS.inputColor,
        borderColor: COLORS.inputColor,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputStyle: {
        color: COLORS.black,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
