import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import AllSongs from "../../components/expolore/AllSongs";
import AllAlbums from "../../components/expolore/AllAlbums";
import AllArtist from "../../components/expolore/AllArtist";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { User as FirebaseAuthUser } from "firebase/auth";
import UserAvatar from "react-native-user-avatar";

export default function TabOneScreen() {
  const [data, setData] = useState<any>(null);
  const { userData } = useAuth();
  console.log(data?.data(), "data");

  const fetchUserData = async (user: FirebaseAuthUser) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap);
      router.push("/(tabs)");
      return docSnap.data();
    } else {
      router.push("/(auth)/");
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user);
    }
  }, []);
  return (
    <SafeAreaView className="min-h-screen flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 100,
          flex: 1,
          minHeight: "100%",
        }}
      >
        {/** header view */}

        <View className="pb-[40px]">
          <View className="flex-row items-center p-3 justify-between">
            <View className="flex-row items-start space-x-4">
              <Pressable onPress={() => router.push("/profile")}>
                <UserAvatar
                  size={50}
                  name="Avishay Bar"
                  textStyle={{
                    fontSize: 10,
                  }}
                />
              </Pressable>
              <View>
                <Text className="text-[18px] font-semibold text-[#fff]">
                  {data?.data()?.email.split("@")[0]}
                </Text>
                <Text className="text-[14px] text-[#DEDEDE] font-medium">
                  {data?.data()?.email}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-5">
              <FontAwesome5 name="bell" color="#fff" size={20} />
              <Pressable onPress={() => router.push("/create")} className="">
                <FontAwesome5 name="plus" color="#fff" size={20} />
              </Pressable>
            </View>
          </View>
          <View className="flex-row items-center p-3 justify-between">
            <Text className="text-[26px] font-semibold text-[#fff] w-[50%]">
              Listen The Latest Musics
            </Text>
            <View className="bg-transparent border border-[#fff] flex-row items-center space-x-3 w-[50%] p-3 rounded-[40px]">
              <FontAwesome5 name="search" color="#fff" size={10} />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#fff"
                className="w-fit text-[#fff]"
              />
            </View>
          </View>
        </View>

        {/* <CarouselCompoent /> */}
        <View className="space-y-[20px] flex-1 min-h-screen">
          <AllSongs />
          <AllAlbums />
          <AllArtist />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
