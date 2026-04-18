import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../assets/styles/signup.styles";

const FormInput = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  showToggle,
  onToggle,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.primary}
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />

        {showToggle && (
          <TouchableOpacity onPress={onToggle} style={styles.eyeIcon}>
            <Ionicons
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormInput;