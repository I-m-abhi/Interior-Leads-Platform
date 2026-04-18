import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import styles from "../../assets/styles/menu.styles";
import { useRouter } from "expo-router";

export default function Menu() {
  const router = useRouter();

  const menuItems = [
    { title: "Support", icon: "headset-outline", action: () => {} },
    { title: "Contact", icon: "call-outline", action: () => {} },
    { title: "About", icon: "information-circle-outline", action: () => {} },
    { title: "Book Consultation", icon: "calendar-outline", action: () => {} },
    { title: "Refund Policy", icon: "document-text-outline", action: () => {} },
    { title: "How App Works", icon: "help-circle-outline", action: () => {} },
    { title: "Privacy Policy", icon: "shield-checkmark-outline", action: () => {} },
    { title: "Blog", icon: "newspaper-outline", action: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Header title="Menu" goBack={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.action}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={20} color="#4CAF50" />
            </View>

            <Text style={styles.menuText}>{item.title}</Text>

            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}