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
  CssBaseline
} from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router";
import ToolbarActionsSearch from "./ToolbarActionsSearch";
import { navigation } from "../routers/navigation";
import LogoIcon from "../commons/components/LogoIcon";

const drawerWidth = 240;

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (segment: string) => {
    navigate(`/${segment}`);
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
        <List>
          {navigation.map((item) => {
            if (item.kind === 'header') {
              return null;
            }
            
            const isSelected = location.pathname === `/${item.segment}`;
            
            return (
              <ListItem key={item.segment} disablePadding>
                <ListItemButton 
                  selected={isSelected}
                  onClick={() => handleNavigate(item.segment!)}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
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
