import React, { useState } from "react";
import { HStack, Switch, Text, useColorMode } from "native-base";
import { useTheme } from "../hooks";
import { colorModeManager } from "../colorModeManager";

const ThemeToggle = () => {
  const { persistedTheme, setPersistedTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(
    persistedTheme === "light" ? false : true
  );
  const { toggleColorMode } = useColorMode();

  const toggleTheme = () => {
    const value = persistedTheme === "light" ? "dark" : "light";
    toggleColorMode();
    colorModeManager.set(persistedTheme === "light" ? "dark" : "light");
    setPersistedTheme(value);
    setIsEnabled(!isEnabled);
  };

  return (
    <HStack space="2" alignItems="center">
      <Text fontSize="md">Light</Text>
      <Switch
        size="md"
        offTrackColor="primary.300"
        onTrackColor="dark.500"
        onThumbColor="dark.300"
        offThumbColor="primary.500"
        isChecked={isEnabled}
        onToggle={toggleTheme}
      />
      <Text fontSize="md">Dark</Text>
    </HStack>
  );
};

export default ThemeToggle;
