import { View, Text, ImageBackground, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { artistsArr } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import YourPlaylist from "../components/userProfile/YourPlaylist";
import {
  _createUser,
  _getWalletAddress,
  _getWalletBalance,
} from "../constants/_helperFunctions";
import { ethers } from "ethers";

interface ArtistProfile {
  name: string;
  owner: string;
  description: string;
  image: string;
  external_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const ArtistProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [artistprofile, setArtistProfile] = useState<ArtistProfile>();
  const [walletBalance, setwalletBalance] = useState("0");
  const [walletAddress, setWalletAddress] = useState("");
  const [text, setText] = useState("Activate Account");
  const params = useLocalSearchParams();
  const { address } = params;

  const getUserWallet = async () => {
    const wallet: any = await _getWalletAddress();
    const balance: any = await _getWalletBalance();
    setWalletAddress(wallet);
    setwalletBalance(balance);
  };

  const handleActivateAccount = async () => {
    console.log("Activating account");
    setText("Activating Account");
    const bool: boolean = await _createUser();
    if (bool) {
      setText("Activated Account Success");
    } else {
      setText("Failed to Activate Account");
    }
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const filteredArtists = artistsArr.filter(
      (artist) => artist.owner === address
    );
    setArtistProfile(filteredArtists[0]);
    getUserWallet();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, minHeight: "100%", marginBottom: 789 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 60, // Adjust padding as needed
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/2911379/pexels-photo-2911379.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
        className="h-[350px] object-cover"
        imageStyle={{ resizeMode: "cover" }}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.01)", "#191414"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
          }}
        />
        <SafeAreaView className="flex-1">
          <View className="flex-row  items-center justify-between px-9">
            <FontAwesome
              onPress={() => router.back()}
              name="arrow-left"
              size={20}
              color="#fff"
            />
            <View className="flex-row items-center space-x-3">
              <FontAwesome5 name="wallet" size={20} color="#fff" />
              <FontAwesome5 name="cog" size={20} color="#fff" />
            </View>
          </View>
          <View
            style={{ alignItems: "center" }}
            className="flex-1 mt-[70px] justify-end"
          >
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
              User
            </Text>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#A8A8A8" }}
            >
              {`${ethers.utils.formatEther(walletBalance)} ETH`}
            </Text>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#A8A8A8" }}
            >
              {`${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`}
            </Text>
          </View>
          <TouchableOpacity onPress={handleActivateAccount}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                // backgroundColor: "gray",
                padding: 5,
              }}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>{text}</Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row items-end justify-end flex-1 mx-auto">
            <TouchableOpacity className="mx-auto items-center mr-4 mt-7 px-6 py-2">
              <Text className="font-opensans-bold text-[#fff] text-[20px]">
                20.9k
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}
                className="font-opensans-regular"
              >
                Following
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => follow()}
              className="mx-auto mt-7 px-6 py-2 items-center"
            >
              <Text className="font-opensans-bold text-[#fff] text-[20px]">
                20.9k
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}
                className="font-opensans-regular"
              >
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <View className="flex-1 min-h-screen">
        <YourPlaylist />
      </View>
    </ScrollView>
  );
};

export default ArtistProfile;
