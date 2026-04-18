import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../assets/styles/planCard.styles";
import COLORS from "../constants/colors";

export default function PlanCard({ plan }) {
  return (
    <View style={styles.card}>

      {/* PLAN NAME */}
      <Text style={styles.planName}>{plan.name}</Text>

      {/* PRICE */}
      <Text style={styles.price}>{plan.price}</Text>

      {/* DETAILS */}
      <View style={styles.details}>
        <Text style={styles.text}>📦 {plan.leads}</Text>
        <Text style={styles.text}>⏳ {plan.validity}</Text>
      </View>

      {/* PRIORITY SECTION */}
      <View style={styles.priorityBox}>
        <Text style={styles.priorityTitle}>Lead Priority Access</Text>

        <Text style={styles.priorityText}>
          Leads are distributed based on subscription level:
        </Text>

        <Text style={styles.priorityPoints}>
          • Top plan users receive leads instantly{"\n"}
          • Next tier users receive leads after 5 minutes{"\n"}
          • Other users receive leads after 10–15 minutes
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>

    </View>
  );
};