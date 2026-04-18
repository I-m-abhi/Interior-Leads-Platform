import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    paddingBottom: 24,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 20,
    margin: 16
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "400",
  },

  subText: {
    color: COLORS.textSecondary,
    marginTop: 4,
    opacity: 0.8,
  },

  leadsBox: {
    alignItems: "center",
  },

  leadsCount: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: "bold",
  },

  leadsText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    opacity: 0.8,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },

  filterBtn: {
    backgroundColor: COLORS.background,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  activeBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.textPrimary,
    fontWeight: "500",
  },

  activeText: {
    color: COLORS.textDark,
    fontWeight: "600",
  },
});