import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  name: {
    color: COLORS.textDark,
    // fontWeight: "bold",
    fontSize: 14,
    paddingBottom: 4,
  },
  // btn: {
  //   backgroundColor: COLORS.primary,
  //   padding: 10,
  //   borderRadius: 8,
  //   color: COLORS.white,
  //   textAlign: "center",
  //   marginTop: 16,
  // },
  btn: {
    padding: 8,
    borderRadius: 50,
    marginTop: 12,
  },

  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  locationText: {
    marginLeft: 4,
    color: COLORS.white,
    fontSize: 12,
  },
});

export default styles;