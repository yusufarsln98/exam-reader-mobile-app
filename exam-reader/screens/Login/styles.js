import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
  },
  bgRectangle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    backgroundColor: COLORS.primary,
    height: height * 0.2,
    width: width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    top: 20,
    position: "relative",
    width: "90%",
  },
  content: {
    position: "relative",
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  inputs: {
    width: "105%",
    marginTop: 10,
  },
  button: {
    width: "100%",
    paddingBottom: 10,
  },
  forgotPassword: {
    marginTop: 10,
    width: "100%",
    alignItems: "flex-start",
  },
  forgotPasswordText: {
    color: COLORS.blue,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});