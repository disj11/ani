import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  CssBaseline,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Search as SearchIcon,
  Clear,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router";
import ToolbarActionsSearch from "./ToolbarActionsSearch";
import { navigation } from "../routers/navigation";
import LogoIcon from "../commons/components/LogoIcon";

const drawerWidth = 320;

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (segment: string) => {
    navigate(`/${segment}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const toggleSubmenu = (segment: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  const handleQuickSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
        >
          <LogoIcon />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Ani
          </Typography>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Quick Search */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Quick search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleQuickSearch()}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: theme.shadows[4],
              },
              "&.Mui-focused": {
                boxShadow: theme.shadows[6],
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "action.active" }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchQuery("")}>
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ px: 1, py: 2 }}>
          {navigation.map((item, index) => {
            if (item.kind === "header") {
              return (
                <Box
                  key={`header-${index}`}
                  sx={{ mt: index > 0 ? 2 : 0, mb: 1 }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      px: 2,
                      color: "text.secondary",
                      fontWeight: "bold",
                      letterSpacing: 1.2,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              );
            }

            if (item.kind === "divider") {
              return <Divider key={`divider-${index}`} sx={{ my: 2, mx: 2 }} />;
            }

            const isSelected = location.pathname === `/${item.segment}`;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openSubmenus[item.segment || ""];

            return (
              <React.Fragment key={item.segment}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => {
                      if (hasChildren) {
                        toggleSubmenu(item.segment!);
                      } else if (item.segment) {
                        handleNavigate(item.segment);
                      }
                    }}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateX(4px)",
                        boxShadow: theme.shadows[2],
                      },
                      "&.Mui-selected": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.primary.light}40)`,
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.primary.light}50)`,
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isSelected ? "primary.main" : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? "primary.main" : "text.primary",
                        },
                      }}
                    />
                    {hasChildren && (
                      <Box sx={{ color: "text.secondary" }}>
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[4],
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            {isMobile ? "Ani" : ""}
          </Typography>
          <ToolbarActionsSearch />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: `linear-gradient(180deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: `linear-gradient(180deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
          transition: "margin 0.3s ease-in-out",
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <Container
          maxWidth="xl"
          sx={{
            mt: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Fade in timeout={300}>
            <Box>
              <Outlet />
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}
