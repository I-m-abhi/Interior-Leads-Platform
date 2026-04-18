import { View, Text, TouchableOpacity } from 'react-native'
import styles from "../assets/styles/leadcard.styles";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"
import RazorpayCheckout from "react-native-razorpay";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

export default function LeadCard({ lead }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const isSoldOut = lead.buyers?.length >= lead.maxBuyers;
  const isBoughtByMe = lead.buyers?.some(
    (b) => b.user === user?._id
  );

  const isSold = isSoldOut || isBoughtByMe;
  console.log("LeadCard Rendered", lead._id, "Sold:", isSold);
  console.log("Buyers:", lead.buyers);
  console.log("lead.maxBuyers", lead.maxBuyers)

  const handleBuy = async (leadId) => {
    if (loading) return;

    try {
      setLoading(true);

      const token = await SecureStore.getItemAsync("token");

      const res = await fetch("https://backend-dyvm.onrender.com/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: 499 })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Order creation failed");
      }

      const options = {
        description: "Lead Purchase",
        currency: "INR",
        key: "rzp_test_SZaERGx2a7nYsr",
        amount: data.order.amount,
        order_id: data.order.id,
        name: "Easy Interior",
        prefill: {
          email: user?.email,
          contact: user?.phoneNumber,
          name: user?.name,
        },
        theme: { color: COLORS.primary },
      };

      const paymentData = await RazorpayCheckout.open(options);

      await fetch("https://backend-dyvm.onrender.com/api/payments/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paymentData,
          leadId,
        }),
      });

      alert("Lead purchased successfully 🎉");

    } catch (error) {
      console.log(error);
      alert(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>

      {/* Clickable Area */}
      <TouchableOpacity onPress={() => router.push(`/(stack)/lead/${lead._id}`)}>
        <Text numberOfLines={1} style={styles.name}>
          {lead.clientDetails.name}
        </Text>

        <Text numberOfLines={1}>
          Budget: {lead.budget}
        </Text>

        <Text numberOfLines={1}>
          {lead.leadTitle}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={COLORS.textPrimary} />
          <Text numberOfLines={1}>
            {lead.city}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Buy Button */}
      <TouchableOpacity
        disabled={isSold || loading}
        onPress={() => handleBuy(lead._id)}
        style={[
          styles.btn,
          { backgroundColor: isSold ? "gray" : COLORS.primary }
        ]}
      >
        <Text style={styles.btnText}>
          {isSold ? "Sold" : loading ? "Processing..." : "Buy"}
        </Text>
      </TouchableOpacity>

    </View>
  )
};