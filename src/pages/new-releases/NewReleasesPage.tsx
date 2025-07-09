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
import { Media } from "./types/new-releases.type";
import PageHeader from "../../commons/components/PageHeader";
import { Schedule } from "@mui/icons-material";
import SectionHeader from "../../commons/components/SectionHeader";

const seasons = [
  { value: "WINTER", label: "Winter" },
  { value: "SPRING", label: "Spring" },
  { value: "SUMMER", label: "Summer" },
  { value: "FALL", label: "Fall" },
];

const NewReleasesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data, loading, error } = useNewReleasesQuery({
    page,
    perPage: 20,
    season: selectedSeason !== "all" ? selectedSeason : undefined,
    seasonYear: selectedYear,
  });

  const handleSeasonChange = (event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value);
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
      <PageHeader
        title="New Anime Releases"
        subtitle="Check out the latest airing anime"
        icon={<Schedule />}
        background={`linear-gradient(135deg, #2196f3, #21cbf3)`}
      />

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
              <MenuItem value="all">All</MenuItem>
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

      <SectionHeader
        title="Latest Airing Anime"
        subtitle={`Check out the latest anime for ${selectedYear}${selectedSeason !== "all" ? ` - ${seasons.find(s => s.value === selectedSeason)?.label}` : ""}`}
        icon={<Schedule />}
        right={<Chip label={`${data?.Page?.pageInfo?.total || 0} items`} sx={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />}
      />

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
            {data.Page.media.map((anime: Media) => (
              <Grid item xs={12} sm={6} key={anime.id}>
                <AnimationCard media={anime} />
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

export default NewReleasesPage;
