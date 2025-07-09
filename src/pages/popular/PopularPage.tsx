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
} from "@mui/material";
import { useLocation } from "react-router";
import AnimationCard from "../trending/components/AnimationCard/AnimationCard";
import { usePopularAnimeQuery } from "./apis/popular.api";
import { Media } from "./types/popular.type";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const PopularPage: React.FC = () => {
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
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {getPageTitle()}
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Popularity" />
            <Tab label="Score" />
            <Tab label="Trending" />
            <Tab label="Favorites" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2 }}>
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
        <Typography variant="h6" gutterBottom>
          Popularity Rankings {selectedYear && `(${selectedYear})`}
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Score Rankings {selectedYear && `(${selectedYear})`}
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Trending Rankings {selectedYear && `(${selectedYear})`}
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Favorites Rankings {selectedYear && `(${selectedYear})`}
        </Typography>
      </TabPanel>

      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
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
          <Grid container spacing={3}>
            {data.Page.media.map((anime: Media, index: number) => (
              <Grid item xs={12} sm={6} key={anime.id}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    variant="h4"
                    color="primary"
                    fontWeight="bold"
                    sx={{ minWidth: 60, textAlign: "center" }}
                  >
                    #{(page - 1) * 20 + index + 1}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <AnimationCard media={anime} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {data.Page.pageInfo.lastPage > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
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
