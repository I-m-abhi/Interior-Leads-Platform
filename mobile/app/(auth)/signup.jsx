import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";
import FormInput from "../../components/FormInput";
import { useAuthStore } from "../../store/authStore";
import Toast from 'react-native-toast-message';
import styles from "../../assets/styles/signup.styles";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",

  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isLoading, register } = useAuthStore();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill all required fields',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Error',
        text2: 'Passwords do not match',
      });
      return;
    }

    const result = await register(formData);

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Registration Success 🎉',
        text2: result.message,
      });

    } else {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: result.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.container}>
          <View style={styles.card}>

            <View style={styles.header}>
              <Text style={styles.title}>Register Account</Text>
              <Text style={styles.subtitle}>Complete your details to continue</Text>
            </View>

            <View style={styles.formContainer}>

              <FormInput
                label="Name"
                icon="person-outline"
                value={formData.name}
                onChangeText={(val) => handleChange("name", val)}
                placeholder="John Doe"
              />
              <FormInput
                label="Phone Number"
                icon="call-outline"
                value={formData.phone}
                onChangeText={(val) => handleChange("phone", val)}
                placeholder="Enter your phone number"
              />
              <FormInput
                label="Email"
                icon="mail-outline"
                value={formData.email}
                onChangeText={(val) => handleChange("email", val)}
                placeholder="email@gmail.com"
              />
              <FormInput
                label="Password"
                icon="lock-closed-outline"
                value={formData.password}
                onChangeText={(val) => handleChange("password", val)}
                placeholder="******"
                secureTextEntry={!showPassword}
                showToggle
                onToggle={() => setShowPassword(!showPassword)}
              />
              <FormInput
                label="Confirm Password"
                icon="lock-closed-outline"
                value={formData.confirmPassword}
                onChangeText={(val) => handleChange("confirmPassword", val)}
                placeholder="******"
                secureTextEntry={!showPassword}
                showToggle
                onToggle={() => setShowPassword(!showPassword)}
              />
              <FormInput
                label="Company Name"
                icon="business-outline"
                value={formData.companyName}
                onChangeText={(val) => handleChange("companyName", val)}
                placeholder="Enter Your Company Name"
              />
              <FormInput
                label="Address"
                icon="location-outline"
                value={formData.address}
                onChangeText={(val) => handleChange("address", val)}
                placeholder="Enter Full Address"
              />
              <FormInput
                label="City"
                icon="location-outline"
                value={formData.city}
                onChangeText={(val) => handleChange("city", val)}
                placeholder="Enter City"
              />

              <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* FOOTER */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
};