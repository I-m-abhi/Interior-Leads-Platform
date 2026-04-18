import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import FormInput from "../../components/FormInput";
import { useAuthStore } from "../../store/authStore";
import Toast from 'react-native-toast-message';
import styles from "../../assets/styles/login.styles";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login } = useAuthStore();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter email & password',
      });
      return;
    }
    const result = await login(formData);

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Login Success 🎉',
        text2: result.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: result.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>

        {/* ILLUSTRATION */}
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/i.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
            <FormInput
              label="Email"
              icon="mail-outline"
              value={formData.email}
              onChangeText={(val) => handleChange("email", val)}
              placeholder="Enter your email"
            />
            <FormInput
              label="Password"
              icon="lock-closed-outline"
              value={formData.password}
              onChangeText={(val) => handleChange("password", val)}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
};