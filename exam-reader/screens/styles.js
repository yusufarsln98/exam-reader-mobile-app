// Global style objects
import { StyleSheet, StatusBar } from "react-native";
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
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    backgroundColor: COLORS.bgColor,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.mainGray,
    shadowColor: COLORS.mainGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    letterSpacing: 0.25,
  },
  header2Bold: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: COLORS.black,
    letterSpacing: 0.25,
  },
  header3: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.black,
  },
  header3Bold: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  paragraph: {
    fontFamily: "Poppins-Light",
    fontSize: 14,
    color: COLORS.black,
  },
  paragraphBold: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: COLORS.black,
  },
  paragraphSmall: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
    color: COLORS.black,
  },
  buttonPrimary: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
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
  listItem: {
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: COLORS.paleGray,
    borderBottomWidth: 1,
    marginBottom: 2,
  },
  swipeAction: {
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 2,
  },
  listContainer: {
    marginTop: 4,
  },
});
