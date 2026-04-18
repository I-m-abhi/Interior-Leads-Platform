import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 30,
    elevation: 5,
  },

  planName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
  },

  price: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 10,
  },

  details: {
    marginTop: 10,
    gap: 6,
  },

  text: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  priorityBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  priorityTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 6,
  },

  priorityText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  priorityPoints: {
    marginTop: 6,
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },

  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});