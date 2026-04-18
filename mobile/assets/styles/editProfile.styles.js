import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 16,
  },

  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },

  saveBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  cancelBtn: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  btnText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 15,
  },

  cancelText: {
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
});