import React, { ChangeEvent, useState } from "react";
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
  Paper,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import AnimationCard from "../trending/components/AnimationCard/AnimationCard";
import { useNewReleasesQuery } from "./apis/new-releases.api";

const seasons = [
  { value: "WINTER", label: "Winter" },
  { value: "SPRING", label: "Spring" },
  { value: "SUMMER", label: "Summer" },
  { value: "FALL", label: "Fall" },
];

const NewReleasesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data, loading, error } = useNewReleasesQuery({
    page,
    perPage: 20,
    season: selectedSeason || undefined,
    seasonYear: selectedYear,
  });

  const handleSeasonChange = (event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value as string);
    setPage(1);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
    setPage(1);
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i,
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        New Anime Releases
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Season</InputLabel>
            <Select
              value={selectedSeason}
              label="Season"
              onChange={handleSeasonChange}
            >
              <MenuItem value="">All</MenuItem>
              {seasons.map((season) => (
                <MenuItem key={season.value} value={season.value}>
                  {season.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Chip
            label="Show Airing Only"
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>
      </Paper>

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
          <Box mb={2}>
            <Typography variant="h6">
              {selectedYear}{" "}
              {selectedSeason
                ? seasons.find((s) => s.value === selectedSeason)?.label
                : "All"}{" "}
              : {data.Page.pageInfo.total} items
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {data.Page.media.map(
              (anime: {
                id: number;
                title: { userPreferred: string };
                coverImage: { large: string };
                averageScore?: number;
                genres: string[];
                description?: string;
                bannerImage?: string;
                status: string;
                episodes?: number;
                format: string;
              }) => (
                <Grid item xs={12} key={anime.id}>
                  <AnimationCard media={anime} />
                </Grid>
              ),
            )}
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

export default NewReleasesPage;
