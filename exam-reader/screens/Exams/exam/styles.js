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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flexDirection: 'column',
  },
  bodyHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  swipeAction: {
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 8,
  },
});