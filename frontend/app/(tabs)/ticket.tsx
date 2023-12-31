import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { city } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import UserAvatar from "react-native-user-avatar";

const ticket = () => {
  const [data, setData] = useState<any>(null);
  const { userData } = useAuth();
  console.log(data?.data(), "data");

  const fetchUserData = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setData(docSnap);
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user);
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 min-h-screen px-[16px]">
      <View className="flex-row items-center space-x-4">
        <UserAvatar
          size={50}
          name="Avishay Bar"
          textStyle={{
            fontSize: 10,
          }}
        />
        <Text className="text-[24px] font-bold text-[#fff]">Discover</Text>
      </View>

      <View className="mt-5">
        <Text className="flex-row items-center text-[20px] font-bold text-[#fff]">
          Cities <FontAwesome name="chevron-right" size={14} color="#fff" />
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-9">
            {city.map((item, index) => (
              <View key={index}>
                <Image
                  source={{
                    uri: item?.image,
                  }}
                  className="w-[190px] bg-black h-[190px] rounded-[30px]"
                />
                <Text className="text-[18px] font-semibold text-[#fff]">
                  {item.city}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="mt-5">
        <Text className="text-[24px] font-bold text-[#fff]">
          Featured Events
        </Text>
        <Text className="text-[18px] font-bold text-gray-700">
          That you might love
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ticket;
