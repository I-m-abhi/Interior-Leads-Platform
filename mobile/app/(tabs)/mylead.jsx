import { View, FlatList } from "react-native";
import React from "react";
import LeadCard from "../../components/LeadCard";
import Header from "../../components/Header";
import COLORS from "../../constants/colors";

export default function MyLeads() {

  const leads = [
    {
      id: "1",
      name: "Twesha",
      type: "2BHK Home",
      budget: "5-8 Lakhs",
      location: "Gr Noida",
    },
    {
      id: "2",
      name: "Mr. Kamal",
      type: "3BHK Home",
      budget: "To be quoted",
      location: "Ghaziabad",
    },
    {
      id: "3",
      name: "Kripa",
      type: "2BHK Home",
      budget: "To be quoted",
      location: "Ghaziabad",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header title="My Leads" showBack={true} />

      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LeadCard lead={item} />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};