import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  headerTextContainer: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.primary,
    display: 'flex',
    flex: 1,
    padding: 16,
    flexDirection: 'column',
  },
  bodyHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 4,
    borderBottomColor: COLORS.paleGray,
    borderBottomWidth: 1,
  },
});