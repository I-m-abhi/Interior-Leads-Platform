import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import Header from "../../components/Header";
import PlanCard from "../../components/PlanCard";
import COLORS from "../../constants/colors";

const { width } = Dimensions.get("window");

export default function Plans() {

  const plans = [
    {
      id: "1",
      name: "Basic",
      price: "₹999",
      leads: "10 Leads",
      validity: "30 Days",
      priority: "After 15 minutes",
    },
    {
      id: "2",
      name: "Gold",
      price: "₹1999",
      leads: "30 Leads",
      validity: "30 Days",
      priority: "After 5 minutes",
    },
    {
      id: "3",
      name: "Platinum",
      price: "₹2999",
      leads: "Unlimited Leads",
      validity: "30 Days",
      priority: "Instant Access",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}>
      <Header title="Plans" goBack={true} />

      <Carousel
        loop
        width={width}
        height={450}
        autoPlay={true}
        data={plans}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <PlanCard plan={item} />}
      />
    </View>
  );
};