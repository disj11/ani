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
  Button
} from "@mui/material";
import { 
  ExpandLess, 
  ExpandMore, 
  Search as SearchIcon,
  FilterList,
  Clear
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router";
import ToolbarActionsSearch from "./ToolbarActionsSearch";
import { navigation } from "../routers/navigation";
import LogoIcon from "../commons/components/LogoIcon";

const drawerWidth = 280;

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", 
  "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", 
  "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
];

const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleNavigate = (segment: string) => {
    navigate(`/${segment}`);
  };

  const toggleSubmenu = (segment: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [segment]: !prev[segment]
    }));
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
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
      params.set('genres', selectedGenres.join(','));
    }
    if (selectedYear) {
      params.set('year', selectedYear.toString());
    }
    if (selectedStatus) {
      params.set('status', selectedStatus);
    }
    navigate(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedYear("");
    setSelectedStatus("");
    setSearchQuery("");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ 
          width: `calc(100% - ${drawerWidth}px)`, 
          ml: `${drawerWidth}px` 
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Anilist
          </Typography>
          <ToolbarActionsSearch />
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LogoIcon />
            <Typography variant="h6" noWrap component="div">
              Anilist
            </Typography>
          </Box>
        </Toolbar>
        
        {/* Quick Search */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="빠른 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
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

        <List sx={{ px: 1 }}>
          {navigation.map((item, index) => {
            if (item.kind === 'header') {
              return (
                <ListItem key={`header-${index}`} sx={{ py: 1, px: 2 }}>
                  <Typography variant="overline" color="text.secondary" fontWeight="bold">
                    {item.title}
                  </Typography>
                </ListItem>
              );
            }
            
            if (item.kind === 'divider') {
              return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
            }
            
            const isSelected = location.pathname === `/${item.segment}`;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openSubmenus[item.segment || ''];
            
            return (
              <React.Fragment key={item.segment}>
                <ListItem disablePadding>
                  <ListItemButton 
                    selected={isSelected}
                    onClick={() => {
                      if (hasChildren) {
                        toggleSubmenu(item.segment!);
                      } else if (item.segment) {
                        // Special handling for certain routes
                        if (item.segment === 'status') {
                          // Don't navigate for status parent - only for children
                          toggleSubmenu(item.segment);
                        } else {
                          handleNavigate(item.segment);
                        }
                      }
                    }}
                    sx={{ borderRadius: 1, mx: 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
                
                {hasChildren && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children!.map((child) => (
                        <ListItem key={child.segment} disablePadding>
                          <ListItemButton
                            sx={{ pl: 4, borderRadius: 1, mx: 1 }}
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

        {/* Filters Section */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterList fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">
              필터
            </Typography>
            {(selectedGenres.length > 0 || selectedYear || selectedStatus) && (
              <IconButton size="small" onClick={clearFilters}>
                <Clear fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Genre Filter */}
          <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, minHeight: 40 }}>
              <Typography variant="body2">
                장르 {selectedGenres.length > 0 && `(${selectedGenres.length})`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {genres.slice(0, 10).map((genre) => (
                  <Chip
                    key={genre}
                    label={genre}
                    size="small"
                    variant={selectedGenres.includes(genre) ? "filled" : "outlined"}
                    onClick={() => handleGenreToggle(genre)}
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Year Filter */}
          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <InputLabel>연도</InputLabel>
            <Select
              value={selectedYear}
              label="연도"
              onChange={(e) => setSelectedYear(e.target.value as number)}
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
          <FormControl fullWidth size="small" sx={{ mt: 1, mb: 2 }}>
            <InputLabel>상태</InputLabel>
            <Select
              value={selectedStatus}
              label="상태"
              onChange={(e) => setSelectedStatus(e.target.value)}
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
            fullWidth
            onClick={handleAdvancedSearch}
            disabled={selectedGenres.length === 0 && !selectedYear && !selectedStatus}
            sx={{ mb: 1 }}
          >
            필터 적용
          </Button>
        </Box>
      </Drawer>
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'background.default', 
          p: 3 
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
