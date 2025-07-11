import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Pagination,
  Tabs,
  Tab,
  Paper,
  SelectChangeEvent,
  Chip,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router";
import AnimationCard from "../trending/components/AnimationCard/AnimationCard";
import { usePopularAnimeQuery } from "./apis/popular.api";
import { Media } from "./types/popular.type";
import PageHeader from "../../commons/components/PageHeader";
import { Whatshot, Star } from "@mui/icons-material";
import SectionHeader from "../../commons/components/SectionHeader";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const theme = useTheme();
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: theme.spacing(3) }}>{children}</Box>}
    </div>
  );
}

const PopularPage: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [page, setPage] = useState(1);

  const sortOptions = [
    "POPULARITY_DESC",
    "SCORE_DESC",
    "TRENDING_DESC",
    "FAVOURITES_DESC",
  ];

  useEffect(() => {
    if (location.pathname === "/top-rated") {
      setTabValue(1); // Set to score tab for top-rated
    }
  }, [location.pathname]);

  const { data, loading, error } = usePopularAnimeQuery({
    sort: [sortOptions[tabValue]],
    page,
    perPage: 20,
    year: selectedYear !== "all" ? selectedYear : undefined,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleYearChange = (event: SelectChangeEvent<number | string>) => {
    const value = event.target.value;
    setSelectedYear(value === "all" ? "all" : Number(value));
    setPage(1);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i,
  );

  const getPageTitle = () => {
    if (location.pathname === "/top-rated") return "Top Rated Rankings";
    return "Popular Rankings";
  };

  return (
    <Box>
      <PageHeader
        title={getPageTitle()}
        subtitle={
          tabValue === 0
            ? "Most popular anime rankings"
            : tabValue === 1
              ? "Top Rated Rankings"
              : tabValue === 2
                ? "Trending Rankings"
                : "Favorites Rankings"
        }
        icon={tabValue === 1 ? <Star /> : <Whatshot />}
        background={`linear-gradient(135deg, #ff9800, #f44336)`}
      />

      <Paper sx={{ mb: theme.spacing(3) }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{ px: theme.spacing(2) }}
          >
            <Tab label="Popularity" />
            <Tab label="Score" />
            <Tab label="Trending" />
            <Tab label="Favorites" />
          </Tabs>
        </Box>

        <Box sx={{ p: theme.spacing(2) }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
            >
              <MenuItem value="all">All</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <SectionHeader
          title="Popularity Rankings"
          subtitle="Most popular anime rankings"
          icon={<Whatshot />}
          right={
            selectedYear !== "all" ? (
              <Chip
                label={selectedYear}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
            ) : undefined
          }
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SectionHeader
          title="Score Rankings"
          subtitle="Top Rated Rankings"
          icon={<Star />}
          right={
            selectedYear !== "all" ? (
              <Chip
                label={selectedYear}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
            ) : undefined
          }
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <SectionHeader
          title="Trending Rankings"
          subtitle="Trending anime rankings"
          icon={<Whatshot />}
          right={
            selectedYear !== "all" ? (
              <Chip
                label={selectedYear}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
            ) : undefined
          }
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <SectionHeader
          title="Favorites Rankings"
          subtitle="Favorites anime rankings"
          icon={<Star />}
          right={
            selectedYear !== "all" ? (
              <Chip
                label={selectedYear}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              />
            ) : undefined
          }
        />
      </TabPanel>

      {loading && (
        <Box display="flex" justifyContent="center" py={theme.spacing(4)}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center">
          An error occurred while fetching data.
        </Typography>
      )}

      {data && (
        <>
          <Grid container spacing={theme.spacing(3)}>
            {data.Page.media.map((anime: Media) => (
              <Grid item xs={12} md={6} key={anime.id}>
                <Box sx={{ flex: 1 }}>
                  <AnimationCard media={anime} />
                </Box>
              </Grid>
            ))}
          </Grid>

          {data.Page.pageInfo.lastPage > 1 && (
            <Box display="flex" justifyContent="center" mt={theme.spacing(4)}>
              <Pagination
                count={data.Page.pageInfo.lastPage}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PopularPage;
