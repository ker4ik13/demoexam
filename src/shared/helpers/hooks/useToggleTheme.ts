import { useColorScheme } from "@mui/joy";

export const useToggleTheme = () => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return {
    toggleTheme,
  };
};
