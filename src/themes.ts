import { extendTheme, themeTools, useColorModeValue } from "native-base";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: "#E3F2F9",
      100: "#b3e0d3",
      200: "#83ccb7",
      300: "#52b89b",
      400: "#2fa887",
      500: "#139874",
      600: "#108b69",
      700: "#0a7b5a",
      800: "#016b4c",
      900: "#004f32",
    },
    secondary: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
  },
  components: {
    FlatList: {
      baseStyle: (props: any) => {
        return {
          bgColor: themeTools.mode("white", "dark.50")(props),
        };
      },
    },
    Heading: {
      baseStyle: (props: any) => {
        return {
          color: themeTools.mode("dark.100", "light.300")(props),
        };
      },
    },
    Text: {
      baseStyle: (props: any) => {
        return {
          color: themeTools.mode("darkText", "light.300")(props),
        };
      },
    },
  },
});

export { theme };
