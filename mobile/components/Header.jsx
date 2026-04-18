import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import COLORS from "../constants/colors";
import styles from "../assets/styles/header.styles";

export default function Header({
  title,
  showIcons = false,
  onRefresh,
  onNotification,
  onMenu,
  goBack = false,
}) {
  const router = useRouter();
  const isCenterTitle = goBack;

  return (
    <View style={styles.container}>

      {/* LEFT SECTION */}
      <View style={styles.leftSection}>
        {goBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons
              name="arrow-back-outline"
              size={22}
              color="black"
            />
          </TouchableOpacity>
        )}

        {!isCenterTitle && (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      {isCenterTitle && (
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {/* RIGHT SECTION */}
      {showIcons && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onRefresh}>
            <Ionicons
              name="refresh-outline"
              size={22}
              color={COLORS.textDark}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotification}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.textDark}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMenu}>
            <Ionicons
              name="menu-outline"
              size={24}
              color={COLORS.textDark}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}