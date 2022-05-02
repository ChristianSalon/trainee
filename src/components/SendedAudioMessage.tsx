import React, { useState, useEffect, useRef } from "react";
import { Box, Button, HStack, Pressable, Text } from "native-base";
import { TextMessageProps } from "../types";
import { Audio } from "expo-av";
import { Ionicons, Entypo } from "@expo/vector-icons";

const SendedAudioMessage = ({ message }) => {
  const AudioPlayer = useRef(new Audio.Sound());
  const [sound, setSound] = useState<undefined | Audio.Sound>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = async () => {
    const playerStatus = await AudioPlayer.current.getStatusAsync();
    if (sound === undefined) {
      // Load
      await AudioPlayer.current.loadAsync({ uri: message.content });
      AudioPlayer.current.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (playbackStatus.didJustFinish) {
          // Finish
          AudioPlayer.current.unloadAsync();
          setSound(undefined);
          setIsPlaying(false);
        }
      });
      setSound(AudioPlayer.current);
      setIsPlaying(true);
      AudioPlayer.current.playAsync();
    } else if (playerStatus.isLoaded && isPlaying) {
      // Pause
      AudioPlayer.current.pauseAsync();
      setIsPlaying(false);
    } else if (playerStatus.isLoaded && !isPlaying) {
      // Resume
      AudioPlayer.current.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <Box
      bg="primary.500"
      p="3"
      mx="2"
      my="1"
      maxWidth="70%"
      rounded="xl"
      alignSelf="flex-end"
      _text={{
        color: "lightText",
      }}
    >
      <HStack space="2" alignItems="center">
        <Text color="white">Audio</Text>
        <Pressable onPress={handlePress}>
          {isPlaying ? (
            <Ionicons name="pause" size={24} color="white" />
          ) : (
            <Entypo name="controller-play" size={24} color="white" />
          )}
        </Pressable>
      </HStack>
    </Box>
  );
};

export default SendedAudioMessage;
