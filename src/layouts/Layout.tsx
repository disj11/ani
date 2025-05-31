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
  Collapse,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Card,
  CardContent,
  Backdrop,
  Slide,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Search as SearchIcon,
  FilterList,
  Clear,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router";
import ToolbarActionsSearch from "./ToolbarActionsSearch";
import { navigation } from "../routers/navigation";
import LogoIcon from "../commons/components/LogoIcon";

const drawerWidth = 320;

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const years = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i,
);

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedStatus, setSelectedStatus] = useState("");

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

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const handleQuickSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAdvancedSearch = () => {
    const params = new URLSearchParams();
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    }
    if (selectedYear) {
      params.set("year", selectedYear.toString());
    }
    if (selectedStatus) {
      params.set("status", selectedStatus);
    }
    navigate(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedYear("");
    setSelectedStatus("");
    setSearchQuery("");
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
          placeholder="빠른 검색..."
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
                        if (item.segment === "status") {
                          toggleSubmenu(item.segment);
                        } else {
                          handleNavigate(item.segment);
                        }
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

                {hasChildren && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children!.map((child) => (
                        <ListItem
                          key={child.segment}
                          disablePadding
                          sx={{ mb: 0.5 }}
                        >
                          <ListItemButton
                            sx={{
                              pl: 5,
                              borderRadius: 2,
                              mx: 1,
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                transform: "translateX(4px)",
                                backgroundColor: "action.hover",
                              },
                            }}
                            selected={location.pathname === `/${child.segment}`}
                            onClick={() => handleNavigate(child.segment!)}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              {child.icon}
                            </ListItemIcon>
                            <ListItemText primary={child.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Enhanced Filters Section */}
        <Card sx={{ mx: 2, mb: 2, overflow: "visible" }} elevation={2}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <FilterList fontSize="small" color="primary" />
              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                스마트 필터
              </Typography>
              {(selectedGenres.length > 0 ||
                selectedYear ||
                selectedStatus) && (
                <Chip
                  label="초기화"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  deleteIcon={<Clear />}
                  onDelete={clearFilters}
                  onClick={clearFilters}
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    borderRadius: 11,
                    '& .MuiChip-label': {
                      px: 1,
                      py: 0
                    },
                    '& .MuiChip-deleteIcon': {
                      fontSize: '0.8rem'
                    }
                  }}
                />
              )}
            </Box>

            {/* Genre Filter */}
            <Accordion
              elevation={0}
              sx={{
                "&:before": { display: "none" },
                backgroundColor: "transparent",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ px: 0, minHeight: 40 }}
              >
                <Typography variant="body2" fontWeight={500}>
                  장르{" "}
                  {selectedGenres.length > 0 && (
                    <Chip
                      label={selectedGenres.length}
                      size="small"
                      color="primary"
                      sx={{ ml: 1, height: 20 }}
                    />
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {genres.slice(0, 12).map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      size="small"
                      variant={
                        selectedGenres.includes(genre) ? "filled" : "outlined"
                      }
                      onClick={() => handleGenreToggle(genre)}
                      sx={{
                        fontSize: "0.7rem",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: theme.shadows[2],
                        },
                      }}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Year Filter */}
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <InputLabel>연도</InputLabel>
              <Select
                value={selectedYear}
                label="연도"
                onChange={(e) => setSelectedYear(e.target.value as number)}
                sx={{
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <MenuItem value="">전체</MenuItem>
                {years.slice(0, 10).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Filter */}
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <InputLabel>상태</InputLabel>
              <Select
                value={selectedStatus}
                label="상태"
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <MenuItem value="">전체</MenuItem>
                <MenuItem value="RELEASING">방영중</MenuItem>
                <MenuItem value="FINISHED">완결</MenuItem>
                <MenuItem value="NOT_YET_RELEASED">방영예정</MenuItem>
                <MenuItem value="CANCELLED">취소</MenuItem>
              </Select>
            </FormControl>

            {/* Apply Filters Button */}
            <Button
              variant="contained"
              size="small"
              onClick={handleAdvancedSearch}
              disabled={
                selectedGenres.length === 0 && !selectedYear && !selectedStatus
              }
              sx={{
                mt: 2,
                px: 3,
                py: 1,
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 500,
                textTransform: 'none',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: 'none',
                minHeight: 32,
                "&:hover": {
                  boxShadow: theme.shadows[2],
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  background: theme.palette.action.disabledBackground,
                },
              }}
            >
              필터 적용
            </Button>
          </CardContent>
        </Card>
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
          p: { xs: 2, sm: 3 },
          transition: "margin 0.3s ease-in-out",
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
