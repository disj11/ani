import React from "react";
import { Box, Typography, Paper, Stack, useTheme, useMediaQuery } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  right,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={0}
      sx={{
        p: theme.spacing(1.5),
        mb: theme.spacing(1.5),
        borderRadius: 1,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "none",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={theme.spacing(2)} sx={{ position: "relative", zIndex: 1 }}>
        {icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 1,
              backgroundColor: "transparent",
              mr: theme.spacing(1),
            }}
          >
            {icon}
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight="bold"
            gutterBottom
            sx={{ color: theme.palette.text.primary }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ opacity: 0.8, color: theme.palette.text.secondary }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {right}
      </Stack>
    </Paper>
  );
};

export default SectionHeader; 