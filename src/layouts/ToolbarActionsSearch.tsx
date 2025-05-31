import { Stack, Tooltip, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../commons/context/ThemeContext";

export default function ToolbarActionsSearch() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <Stack direction="row">
      <Tooltip title="Toggle theme">
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
