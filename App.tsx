import "react-native-gesture-handler";
import React from "react";
import Navigation from "./src/navigation";
import { ThemeProvider } from "./src/hooks/useTheme";

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
