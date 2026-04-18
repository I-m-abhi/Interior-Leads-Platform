import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  menuText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: "500",
  },
});