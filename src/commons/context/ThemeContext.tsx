import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a CustomThemeProvider");
  }
  return context;
};

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as PaletteMode) || "light";
  });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
        light: mode === "light" ? "#42a5f5" : "#e3f2fd",
        dark: mode === "light" ? "#1565c0" : "#42a5f5",
      },
      secondary: {
        main: mode === "light" ? "#dc004e" : "#f48fb1",
      },
      background: {
        default: mode === "light" ? "#f5f7fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#2c3e50" : "#ffffff",
        secondary: mode === "light" ? "#546e7a" : "#b0b0b0",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      body1: {
        lineHeight: 1.6,
      },
      body2: {
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows:
      mode === "light"
        ? [
            "none",
            "0px 1px 3px 0px rgba(0,0,0,0.1),0px 1px 2px 0px rgba(0,0,0,0.06)",
            "0px 4px 6px -1px rgba(0,0,0,0.1),0px 2px 4px -1px rgba(0,0,0,0.06)",
            "0px 10px 15px -3px rgba(0,0,0,0.1),0px 4px 6px -2px rgba(0,0,0,0.05)",
            "0px 20px 25px -5px rgba(0,0,0,0.1),0px 10px 10px -5px rgba(0,0,0,0.04)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
            "0px 25px 50px -12px rgba(0,0,0,0.25)",
          ]
        : [
            "none",
            "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 2px 0px rgba(0,0,0,0.12)",
            "0px 4px 6px -1px rgba(0,0,0,0.2),0px 2px 4px -1px rgba(0,0,0,0.12)",
            "0px 10px 15px -3px rgba(0,0,0,0.2),0px 4px 6px -2px rgba(0,0,0,0.1)",
            "0px 20px 25px -5px rgba(0,0,0,0.2),0px 10px 10px -5px rgba(0,0,0,0.08)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
            "0px 25px 50px -12px rgba(0,0,0,0.4)",
          ],
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.06)"
                : "1px solid rgba(255,255,255,0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 24px",
          },
          contained: {
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.06)"
                : "1px solid rgba(255,255,255,0.1)",
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
