import { StyleSheet, StatusBar } from "react-native";
import {Animated, Easing} from 'react-native';
import { COLORS, DIMENSIONS } from "../../constants";
import { globalStyles } from "../styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        marginBottom: DIMENSIONS.bottom_bar_height,
    },
    header: {
        backgroundColor: COLORS.bgColor,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
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
    headerText: {
        ...globalStyles.header2Bold,
        color: COLORS.primary,
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
    classItem: {
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: COLORS.paleGray,
        borderBottomWidth: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    classItemText: {
        fontSize: 18,
        color: COLORS.black,
        fontFamily: 'Poppins-Regular',
    },
    swipeAction: {
        backgroundColor: COLORS.bgColor,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        marginTop: 8,
    },
});