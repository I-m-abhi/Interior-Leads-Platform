import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import { useLeadStore } from "../store/leadStore";
import styles from "../assets/styles/homeTopSection.styles";
import COLORS from "../constants/colors";

export default function HomeTopSection() {
  const { user } = useAuthStore();
  const { filter, fetchLeads } = useLeadStore();

  const handleFilter = async (type) => {
    await fetchLeads(type);
  };

  return (
    <View style={styles.container}>

      {/* Top Row */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Hi, {user?.name}</Text>
          <Text style={styles.subText}>Not a member</Text>
        </View>

        <View style={styles.leadsBox}>
          <Text style={styles.leadsCount}>{user?.noOfLead}</Text>
          <Text style={styles.leadsText}>Leads remaining</Text>
        </View>
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>

        <Ionicons
          name="options-outline"
          size={20}
          color={COLORS.textDark}
        />

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === "all" && styles.activeBtn
          ]}
          onPress={() => handleFilter("all")}
        >
          <Text style={filter === "all" ? styles.activeText : styles.filterText}>
            ✓ All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === "available" && styles.activeBtn
          ]}
          onPress={() => handleFilter("available")}
        >
          <Text style={filter === "available" ? styles.activeText : styles.filterText}>
            Available
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === "sold" && styles.activeBtn
          ]}
          onPress={() => handleFilter("sold")}
        >
          <Text style={filter === "sold" ? styles.activeText : styles.filterText}>
            Sold Out
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}