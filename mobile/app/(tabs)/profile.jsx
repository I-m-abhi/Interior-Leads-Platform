import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore.js";
import Header from "../../components/Header";
import styles from "../../assets/styles/profile.styles";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <Header title="Profile Details" goBack={true} />

      {/* USER INFO CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={18} color="#2e5a2e" />
          <Text style={styles.text}>Prem Ranjan</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={18} color="#2e5a2e" />
          <Text style={styles.text}>+91 8271197098</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={18} color="#2e5a2e" />
          <Text style={styles.text}>prem.ranjan@example.com</Text>
        </View>
      </View>

      {/* COMPANY CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Company Details</Text>

        <View style={styles.row}>
          <Ionicons name="business-outline" size={18} color="#2e5a2e" />
          <Text style={styles.text}>Python Decor & Associates</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={18} color="#2e5a2e" />
          <Text style={styles.text}>Noida</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="map-outline" size={18} color="#2e5a2e" />
          <Text style={styles.text}>Delhi - NCR</Text>
        </View>
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.push("/(stack)/edit-profile")}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}