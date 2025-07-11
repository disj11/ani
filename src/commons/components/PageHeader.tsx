import React from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  background?: string; // 그라데이션 등
  children?: React.ReactNode;
  color?: string; // 텍스트 색상
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  background,
  children,
  color,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: theme.spacing(3), md: theme.spacing(4) },
        mb: theme.spacing(4),
        borderRadius: 2,
        background: background || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: color || "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: theme.spacing(2), position: "relative", zIndex: 1 }}>
        {icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              mr: theme.spacing(2),
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            gutterBottom
            sx={{ color: color || "white" }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant={isMobile ? "body1" : "h6"} sx={{ opacity: 0.9, color: color || "white" }}>
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>
      </Box>
    </Paper>
  );
};

export default PageHeader; 