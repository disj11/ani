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
    spacing: 8,
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#5c6bc0" : "#9fa8da",
        light: mode === "light" ? "#7986cb" : "#c5cae9",
        dark: mode === "light" ? "#3f51b5" : "#7986cb",
      },
      secondary: {
        main: mode === "light" ? "#ff7043" : "#ffab91",
      },
      background: {
        default: mode === "light" ? "#f0f2f5" : "#0a0a0a",
        paper: mode === "light" ? "#ffffff" : "#1c1c1c",
      },
      text: {
        primary: mode === "light" ? "#212121" : "#e0e0e0",
        secondary: mode === "light" ? "#757575" : "#a0a0a0",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        letterSpacing: "-0.015em",
      },
      h2: {
        fontWeight: 700,
        fontSize: "2.5rem",
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 600,
        fontSize: "2rem",
        letterSpacing: "-0.005em",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.5rem",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.25rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
      },
      body1: {
        lineHeight: 1.5,
        fontSize: "1rem",
      },
      body2: {
        lineHeight: 1.4,
        fontSize: "0.875rem",
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows:
      mode === "light"
        ? [
            "none",
            "0px 1px 2px rgba(0, 0, 0, 0.05)",
            "0px 2px 4px rgba(0, 0, 0, 0.05)",
            "0px 4px 8px rgba(0, 0, 0, 0.05)",
            "0px 8px 16px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
            "0px 16px 32px rgba(0, 0, 0, 0.05)",
          ]
        : [
            "none",
            "0px 1px 2px rgba(0, 0, 0, 0.1)",
            "0px 2px 4px rgba(0, 0, 0, 0.1)",
            "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "0px 8px 16px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
            "0px 16px 32px rgba(0, 0, 0, 0.1)",
          ],
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.06)"
                : "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[4],
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            padding: theme.spacing(1, 3),
          }),
          contained: {
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
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
          root: ({ theme }) => ({
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              transition: "all 0.2s ease-in-out",
              "&:hover fieldset": {
                borderColor: theme.palette.primary.light,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
                boxShadow: theme.shadows[2],
              },
            },
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 1,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.06)"
                : "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[4],
            },
          }),
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
