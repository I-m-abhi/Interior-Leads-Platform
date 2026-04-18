import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  buttonContainer: {
    marginTop: 10,
    gap: 12,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e53935", // red for logout
    padding: 14,
    borderRadius: 10,
    gap: 8,
  },

  btnText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 15,
  },
});