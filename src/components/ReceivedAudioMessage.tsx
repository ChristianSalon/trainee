import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";
import React, { useRef, useState } from "react";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../themes";

const ReceivedAudioMessage = ({ message }) => {
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
    <HStack space="xs" alignItems="flex-end" mx="2" my="1">
      <Avatar bg="transparent" size="sm" source={{ uri: message.photoURL }} />
      <Box
        bg={useColorModeValue("gray.200", "gray.500")}
        p="3"
        maxWidth="70%"
        rounded="xl"
        alignSelf="flex-end"
        _text={{
          color: "darkText",
        }}
      >
        <HStack space="2" alignItems="center">
          <Text color="darkText">Audio</Text>
          <Pressable onPress={handlePress}>
            {isPlaying ? (
              <Ionicons name="pause" size={24} color={theme.colors.darkText} />
            ) : (
              <Ionicons name="play" size={24} color="black" />
            )}
          </Pressable>
        </HStack>
      </Box>
    </HStack>
  );
};

export default ReceivedAudioMessage;
