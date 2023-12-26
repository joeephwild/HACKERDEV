import { View, Text, Alert, FlatList, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";

const ImageUpload = () => {
  const [images, setImages] = useState<MediaLibrary.Asset[]>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getImages = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
      });
      setImages(assets);
      console.log(assets);
      setSelectedImage(assets[0]?.uri || null);
    } else {
      Alert.alert(
        "Permission needed",
        "Please grant the permission to access photos"
      );
    }
  };

  useEffect(() => {
    getImages();
  }, []);
  return (
    <View className="flex-1 min-h-screen">
      <SafeAreaView className="bg-black h-[400px] items-center justify-center">
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            className="w-[200px] h-[360px] "
          />
        )}
      </SafeAreaView>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3} // change this value to adjust the number of columns
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedImage(item.uri)}
            style={{ flex: 1, flexDirection: "column", margin: 1 }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }} // adjust the width and height as needed
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default ImageUpload;
