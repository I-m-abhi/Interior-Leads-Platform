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

  const handleBuy = async (leadPrice) => {
    if (loading) return;

    try {
      setLoading(true);

      const token = await SecureStore.getItemAsync("token");

      const { data: keyData } = await fetch("https://api.decowallstudio.com/api/getKey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { key } = keyData;

      const { data: orderData } = await fetch("https://api.decowallstudio.com/api/payment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        amount: leadPrice * 1000
      });

      // const data = await res.json();
      console.log(key, orderData)

      // if (!res.ok) {
      //   throw new Error(data?.message || "Order creation failed");
      // }

      // const options = {
      //   description: "Lead Purchase",
      //   currency: "INR",
      //   key: "rzp_test_SZaERGx2a7nYsr",
      //   amount: data.order.amount,
      //   order_id: data.order.id,
      //   name: "Easy Interior",
      //   prefill: {
      //     email: user?.email,
      //     contact: user?.phone,
      //     name: user?.name,
      //   },
      //   theme: { color: COLORS.primary },
      // };

      // const paymentData = await RazorpayCheckout.open(options);

      // ✅ verify payment
      // const verifyRes = await fetch("https://api.decowallstudio.com/api/payments/verify-payment", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     ...paymentData,
      //     leadId,
      //   }),
      // });

      // const verifyData = await verifyRes.json();

      // if (!verifyRes.ok) {
      //   throw new Error(verifyData.message || "Verification failed");
      // }

      // alert("Lead purchased successfully 🎉");

    } catch (error) {
      if (error.code === "PAYMENT_CANCELLED") {
        alert("Payment cancelled");
      } else {
        console.log(error);
        alert(error.message || "Payment failed");
      }
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
        onPress={() => handleBuy("2")}
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