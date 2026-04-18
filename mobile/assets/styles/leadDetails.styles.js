import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 6,
    color: COLORS.textPrimary,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: COLORS.textDark,
  },

  desc: {
    fontSize: 14,
    marginBottom: 6,
    color: COLORS.textSecondary,
  },

  buyBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buyText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },

  soldBox: {
    backgroundColor: "gray",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  soldText: {
    color: "white",
    fontWeight: "600",
  },
});