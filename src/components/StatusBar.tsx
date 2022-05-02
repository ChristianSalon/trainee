import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useColorModeValue } from "native-base";
import React from "react";

interface Props {
  style?: string;
}

const StatusBar: React.FC<Props> = ({ style }) => {
  return (
    <ExpoStatusBar style={style ? style : useColorModeValue("dark", "light")} />
  );
};

export default StatusBar;
