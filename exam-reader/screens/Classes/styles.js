import { StyleSheet, StatusBar } from "react-native";
import { COLORS, DIMENSIONS } from "../../constants";
import { globalStyles } from "../styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    marginBottom: DIMENSIONS.bottom_bar_height,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: StatusBar.currentHeight,
    marginBottom: 0,
  },
  searchInput: {
    backgroundColor: COLORS.bgColor,
    borderBottomWidth: 0,
  },
  inputStyle: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: COLORS.inputColor,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: COLORS.black
  },
  popover: {
    ...globalStyles.panel,
    padding: 16,
  },
});