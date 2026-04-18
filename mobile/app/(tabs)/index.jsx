import { useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useLeadStore } from '../../store/leadStore';
import { useRouter } from 'expo-router';
import Header from "../../components/Header";
import HomeTopSection from '../../components/HomeTopSection';
import LeadCard from '../../components/LeadCard';
import Toast from "react-native-toast-message";
import styles from '../../assets/styles/home.styles';

export default function Home() {
  const router = useRouter();
  const { leads, fetchLeads, fetchMoreLeads, isLoading, isFetchingMore } = useLeadStore();

  useEffect(() => {
    fetchLeads("all");
  }, []);

  useEffect(() => {
    const load = async () => {
      const res = await fetchLeads("all");

      if (!res.success) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: res.message,
        });
      }
    };

    load();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Easy Interior"
        showIcons={true}
        onRefresh={() => console.log("refresh")}
        onNotification={() => console.log("notification")}
        onMenu={() => router.push("/(stack)/menu")}
      />
      <HomeTopSection />
      <FlatList
        data={leads}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.leadContainer}
        renderItem={({ item }) => <LeadCard lead={item} />}

        onEndReached={fetchMoreLeads}
        onEndReachedThreshold={0.5}

        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" /> : null
        }
      />
    </View>
  )
};