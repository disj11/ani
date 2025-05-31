import { Stack, Tooltip, IconButton, TextField } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useThemeMode } from "../commons/context/ThemeContext";

export default function ToolbarActionsSearch() {
  const { mode, toggleColorMode } = useThemeMode();

  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
      />
      <Tooltip title="Toggle theme">
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
