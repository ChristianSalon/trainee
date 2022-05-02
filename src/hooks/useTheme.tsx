import React, { createContext, useContext, useEffect, useState } from "react";
import { colorModeManager } from "../colorModeManager";

interface Props {
  persistedTheme: string;
  setPersistedTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<Props>({} as any);

export const ThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [persistedTheme, setPersistedTheme] = useState("light");

  useEffect(() => {
    const fetchPersistedTheme = async () => {
      try {
        const persistedTheme = await colorModeManager.get().then((val) => {
          //console.log("dcdsv" + val);
          setPersistedTheme(val === "light" ? "light" : "dark");
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPersistedTheme();
  });

  return (
    <ThemeContext.Provider value={{ persistedTheme, setPersistedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
