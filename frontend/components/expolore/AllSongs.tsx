import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RangeComponents from "../RangeComponents";
import SongsCard from "../cards/SongsCard";
import { ScrollView } from "react-native-gesture-handler";
// import { ApolloProvider, useQuery } from "@apollo/client";
// import { client } from "../../constants/addresses";
// import GET_LISTED_NFTS from "../../constants/subgraphQueries";
import { songs } from "../../utils";

const AllSongs = () => {
  // const { loading, error, data: listedNfts } = useQuery(GET_LISTED_NFTS);

  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-[20px] font-bold text-[#fff]">
          Songs made for you
        </Text>
        <View className="flex-row items-center space-x-1">
          <Text className="text-[12px] font-bold text-[#fff]">More</Text>
          <FontAwesome name="chevron-right" color="#fff" />
        </View>
      </View>

      <RangeComponents />

      <ScrollView
        horizontal
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View className="flex-col space-y-6 mt-4 w-full overflow-hidden">
          {!songs
            ? null
            : songs?.map((val, i) => <SongsCard key={i} {...val} />)}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllSongs;
