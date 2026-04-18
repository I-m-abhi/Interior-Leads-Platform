import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },

  backButton: {
    marginRight: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
  },

  centerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    flexDirection: "row",
    gap: 16,
    zIndex: 2,
  },
});