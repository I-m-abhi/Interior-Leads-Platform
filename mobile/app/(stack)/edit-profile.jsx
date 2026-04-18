import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import FormInput from "../../components/FormInput";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/editProfile.styles";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();
  const { user, updateProfile, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    companyName: user?.companyName || "",
    address: user?.address || "",
    city: user?.city || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    await updateProfile(formData);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header title="Edit Profile" goBack={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Update Your Details</Text>

          <FormInput
            label="Name"
            icon="person-outline"
            value={formData.name}
            onChangeText={(val) => handleChange("name", val)}
            placeholder="Your Name"
          />

          <FormInput
            label="Phone Number"
            icon="call-outline"
            value={formData.phoneNumber}
            onChangeText={(val) => handleChange("phoneNumber", val)}
            placeholder="9876543210"
          />

          <FormInput
            label="Email"
            icon="mail-outline"
            value={formData.email}
            onChangeText={(val) => handleChange("email", val)}
            placeholder="email@gmail.com"
          />

          <FormInput
            label="Company Name"
            icon="business-outline"
            value={formData.companyName}
            onChangeText={(val) => handleChange("companyName", val)}
            placeholder="Company"
          />

          <FormInput
            label="Address"
            icon="location-outline"
            value={formData.address}
            onChangeText={(val) => handleChange("address", val)}
            placeholder="Full Address"
          />

          <FormInput
            label="City"
            icon="location-outline"
            value={formData.city}
            onChangeText={(val) => handleChange("city", val)}
            placeholder="City"
          />

          {/* BUTTONS */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Save Changes</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}