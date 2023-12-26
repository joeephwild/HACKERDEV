import { FontAwesome5 } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { BottomSheetMethods } from "@devvie/bottom-sheet";
import { Portal } from "@gorhom/portal";

import PrivacySetting from "./PrivacySetting";

type Props = {
  setActiveUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  activeUrl: string | undefined;
};

const LiveScreen = ({ setActiveUrl, activeUrl }: Props) => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState<number | FlashMode>(FlashMode.on);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<Camera>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("option1");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const sheetRef = useRef<BottomSheetMethods>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const [isRecording, setIsRecording] = useState(false);

  const recordVideo = () => {
    setIsRecording((prevIsRecording) => !prevIsRecording);
  };

  const videoRef = React.useRef<Video>(null);

  // ...

  useEffect(() => {
    if (videoRef.current && activeUrl) {
      videoRef.current.loadAsync({ uri: activeUrl });
    }
  }, [activeUrl]);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].duration) {
      if (result.assets[0].duration > 15000) {
        alert("Please select a video that is not more than 15 seconds long.");
      } else {
        // The video is not more than 15 seconds long, you can use it here.
        console.log(result.assets[0].uri);
        setActiveUrl(result.assets[0].uri);

        // Convert the uri to a File object and upload it
        const file = new File([result.assets[0].uri], "video.mp4", {
          type: "video/mp4",
        });
        // await uploadFileToPinata(file);
      }
    }
  };

  useEffect(() => {
    let video;
    let timeoutId: NodeJS.Timeout = setTimeout(() => {}, 0);
    if (isRecording && cameraRef.current) {
      (async () => {
        video = await cameraRef.current?.recordAsync();
        setActiveUrl(video?.uri);
      })();
      timeoutId = setTimeout(() => {
        setIsRecording(false);
      }, 15000); // stop recording after 15 seconds
    } else if (!isRecording && cameraRef.current) {
      cameraRef.current.stopRecording();
      clearTimeout(timeoutId); // clear the timeout when recording is manually stopped
    }
    return () => clearTimeout(timeoutId); // clear the timeout when the component unmounts
  }, [isRecording]);

  const toggleFlash = () => {
    setFlashMode(flashMode === FlashMode.off ? FlashMode.on : FlashMode.off);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!isRecording && activeUrl) {
    return (
      <View>
        <Video
          ref={videoRef}
          source={{
            uri: activeUrl,
          }}
          resizeMode={ResizeMode.COVER}
          isMuted={false}
          rate={1.0}
          isLooping
          shouldPlay={isPlaying}
          style={{
            minHeight: "100%",
            width: 400,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -12 }, { translateY: -12 }],
          }}
        >
          <FontAwesome5
            onPress={togglePlay}
            name={isPlaying ? "pause" : "play"}
            size={34}
            color="#fff"
          />
        </View>
        <Pressable
          onPress={() => sheetRef?.current?.open()}
          className="absolute bottom-[30px] right-0 bg-[#fff] p-[10px] rounded-full"
        >
          <FontAwesome5 name="arrow-right" size={24} color="#000" />
        </Pressable>
        <Portal>
          <PrivacySetting sheetRef={sheetRef} />
        </Portal>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <Camera ref={cameraRef} className="flex-1 min-h-screen" type={type}>
      <SafeAreaView className="flex-row  px-4 items-center justify-between w-full">
        <FontAwesome5
          // onPress={recordVideo}
          name="times"
          size={24}
          color={"#fff"}
        />
        <TouchableOpacity className="px-9 py-2.5 rounded-lg">
          <FontAwesome5 name="cog" size={20} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-1 justify-end mb-9">
        <TouchableOpacity className="flex-row justify-center bg-red-700 w-[90%] py-[9px] space-x-4 rounded-lg mx-auto items-center">
          <FontAwesome5 name="video" size={20} color="#fff" />
          <Text className="text-[16px] font-opensans-bold text-[#ffff]">
            Start Live
          </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
