import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import styles from "../../../assets/styles/leadDetails.styles";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";

export default function LeadDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // 🔥 TEMP DATA (replace with API later)
  const lead = {
    title: "3BHK Home",
    city: "Greater Noida",
    budget: "5-8 Lakhs",
    size: "1000 sqft",
    client: { name: "Dr. Sanchita" },
    description: {
      requirements: "Design & Execution",
      readyToMeet: "Yes",
      timeToStart: "Immediately",
      meetingDetails: "Call anytime",
      streetAddress: "Sector 4, Greater Noida"
    },
    status: "available"
  };

  const isSold = lead.status === "sold";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Lead Details"
        // showIcons={true}
        goBack={true}
      />

      {/* Title */}
      <Text style={styles.title}>{lead.title}</Text>

      {/* Basic Info */}
      <Text style={styles.info}>👤 {lead.client.name}</Text>
      <Text style={styles.info}>💰 {lead.budget}</Text>
      <Text style={styles.info}>📐 {lead.size}</Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={18} color={COLORS.primary} />
        <Text style={styles.info}>{lead.city}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Description Section */}
      <Text style={styles.sectionTitle}>Project Details</Text>

      <Text style={styles.desc}>
        Requirement: {lead.description.requirements}
      </Text>

      <Text style={styles.desc}>
        Ready to meet: {lead.description.readyToMeet}
      </Text>

      <Text style={styles.desc}>
        Start Time: {lead.description.timeToStart}
      </Text>

      <Text style={styles.desc}>
        Address: {lead.description.streetAddress}
      </Text>

      <Text style={styles.desc}>
        Notes: {lead.description.meetingDetails}
      </Text>

      {/* Buy Button */}
      {!isSold && (
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyText}>Buy Lead</Text>
        </TouchableOpacity>
      )}

      {isSold && (
        <View style={styles.soldBox}>
          <Text style={styles.soldText}>This Lead is Sold</Text>
        </View>
      )}

    </ScrollView>
  );
}