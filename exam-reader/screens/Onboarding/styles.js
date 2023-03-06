import COLORS from "../../constants/colors";
import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  bgRectangle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    backgroundColor: COLORS.primary,
    height: height * 0.5,
    width: width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoContainer: {
    position: "relative",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
    width: "90%",
    // margin between logo and text
  },
  logoText: {
    marginTop: 10,
  },
  content: {
    position: "relative",
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    padding: 20,
    marginTop: 60,
  },
  buttons: {
    width: "100%",
    marginTop: 20,
    paddingBottom: 20,
  },
});

