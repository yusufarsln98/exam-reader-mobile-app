import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { globalStyles } from "../styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        paddingLeft: 16,
    },
    contextContainer: {
        marginTop: 8,
    },
    horizontalContainer: {
        marginTop: 8,
    },
    itemContainer: {
        backgroundColor: COLORS.snow,
        borderRadius: 8,
        marginBottom: 8,
        marginRight: 8,
        paddingHorizontal: 16, 
        paddingVertical: 8,
        height: 100,
        width: 160,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    spacedRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 16,
    },

});