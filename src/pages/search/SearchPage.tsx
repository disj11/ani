import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router";
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Pagination,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Switch,
  FormControlLabel,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Fade,
  Stack,
  Divider,
  InputAdornment,
  Drawer,
  IconButton,
  Skeleton,
} from "@mui/material";
import {
  Search as SearchIcon,
  ExpandMore,
  Clear,
  FilterList,
  Tune,
  Close,
} from "@mui/icons-material";
import AnimationCard from "../trending/components/AnimationCard/AnimationCard";
import { useSearchAnimeQuery } from "./apis/search.api";
import PageHeader from "../../commons/components/PageHeader";

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

const formats = [
  { value: "TV", label: "TV" },
  { value: "MOVIE", label: "Movie" },
  { value: "OVA", label: "OVA" },
  { value: "ONA", label: "ONA" },
  { value: "SPECIAL", label: "Special" },
];

const statuses = [
  { value: "RELEASING", label: "Airing" },
  { value: "FINISHED", label: "Completed" },
  { value: "NOT_YET_RELEASED", label: "Upcoming" },
  { value: "CANCELLED", label: "Cancelled" },
];

const sortOptions = [
  { value: "POPULARITY_DESC", label: "Most Popular" },
  { value: "SCORE_DESC", label: "Highest Rated" },
  { value: "TRENDING_DESC", label: "Trending" },
  { value: "UPDATED_AT_DESC", label: "Recently Updated" },
  { value: "START_DATE_DESC", label: "Newest" },
  { value: "TITLE_ROMAJI", label: "Title Order" },
];

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [sortBy, setSortBy] = useState("POPULARITY_DESC");
  const [scoreRange, setScoreRange] = useState<number[]>([0, 100]);
  const [episodeRange, setEpisodeRange] = useState<number[]>([1, 50]);
  const [useEpisodeFilter, setUseEpisodeFilter] = useState(false);
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useSearchAnimeQuery({
    search: searchQuery || undefined,
    genre: selectedGenres.length > 0 ? selectedGenres : undefined,
    year: selectedYear !== "all" ? selectedYear : undefined,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    format: selectedFormat !== "all" ? selectedFormat : undefined,
    sort: [sortBy],
    page,
    perPage: 20,
    scoreGreater: scoreRange[0] > 0 ? scoreRange[0] : undefined,
    episodeGreater: useEpisodeFilter ? episodeRange[0] : undefined,
    episodeLesser: useEpisodeFilter ? episodeRange[1] : undefined,
  });

  useEffect(() => {
    const q = searchParams.get("q");
    const genres = searchParams.get("genres");
    const year = searchParams.get("year");
    const status = searchParams.get("status");

    // Handle route-based filtering
    if (location.pathname.includes("/status/")) {
      const pathStatus = location.pathname.split("/status/")[1];
      switch (pathStatus) {
        case "airing":
          setSelectedStatus("RELEASING");
          break;
        case "finished":
          setSelectedStatus("FINISHED");
          break;
        case "upcoming":
          setSelectedStatus("NOT_YET_RELEASED");
          break;
      }
    } else if (location.pathname === "/genre") {
      // Show genre selection interface
      setSortBy("POPULARITY_DESC");
    } else if (location.pathname === "/year") {
      // Show year selection interface
      setSortBy("START_DATE_DESC");
    } else if (location.pathname === "/animations") {
      // Show all animations
      setSortBy("POPULARITY_DESC");
    }

    if (q) {
      setSearchQuery(q);
    }
    if (genres) {
      setSelectedGenres(genres.split(","));
    }
    if (year) {
      setSelectedYear(parseInt(year));
    }
    if (status) {
      setSelectedStatus(status);
    }

    // Trigger search if there are parameters or route-based filters
    if (
      q ||
      genres ||
      year ||
      status ||
      location.pathname.includes("/status/")
    ) {
      setPage(1);
    }
  }, [searchParams, location.pathname]);

  // Auto-search when filters change
  useEffect(() => {
    if (
      selectedGenres.length > 0 ||
      selectedYear ||
      selectedStatus ||
      selectedFormat ||
      searchQuery
    ) {
      refetch();
    }
  }, [
    selectedGenres,
    selectedYear,
    selectedStatus,
    selectedFormat,
    searchQuery,
    refetch,
  ]);

  const handleSearch = () => {
    setPage(1);
    updateSearchParams();
    refetch();
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedYear("all");
    setSelectedStatus("all");
    setSelectedFormat("all");
    setScoreRange([0, 100]);
    setEpisodeRange([1, 50]);
    setUseEpisodeFilter(false);
    setSortBy("POPULARITY_DESC");
    setPage(1);
    setSearchParams({});
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedGenres.length > 0)
      params.set("genres", selectedGenres.join(","));
    if (selectedYear !== "all") params.set("year", selectedYear.toString());
    if (selectedStatus !== "all") params.set("status", selectedStatus);
    if (selectedFormat !== "all") params.set("format", selectedFormat);
    setSearchParams(params);
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
    if (location.pathname.includes("/status/airing"))
      return "Airing Animations";
    if (location.pathname.includes("/status/finished"))
      return "Completed Animations";
    if (location.pathname.includes("/status/upcoming"))
      return "Upcoming Animations";
    if (location.pathname === "/genre") return "Animations by Genre";
    if (location.pathname === "/year") return "Animations by Year";
    if (location.pathname === "/animations") return "All Animations";
    return "Advanced Search";
  };

  const renderFilters = () => (
    <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <FilterList color="primary" />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Search Filters
          </Typography>
          {isMobile && (
            <IconButton
              onClick={() => setMobileFiltersOpen(false)}
              sx={{ ml: "auto" }}
            >
              <Close />
            </IconButton>
          )}
        </Box>

        {/* Search Query */}
        <TextField
          fullWidth
          label="Search by Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover": {
                boxShadow: theme.shadows[2],
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Sort */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Sort Criteria</InputLabel>
          <Select
            value={sortBy}
            label="Sort Criteria"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Genres */}
        <Accordion
          elevation={0}
          sx={{
            mb: 3,
            "&:before": { display: "none" },
            backgroundColor: "transparent",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={500}>
              Genre{" "}
              {selectedGenres.length > 0 && (
                <Chip
                  label={selectedGenres.length}
                  size="small"
                  color="primary"
                  sx={{
                    ml: 1,
                    height: 18,
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    borderRadius: 9,
                  }}
                />
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  variant={
                    selectedGenres.includes(genre) ? "filled" : "outlined"
                  }
                  onClick={() => handleGenreToggle(genre)}
                  sx={{
                    height: 24,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    borderRadius: 12,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: theme.shadows[1],
                    },
                    "& .MuiChip-label": {
                      px: 1.5,
                      py: 0,
                    },
                  }}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Year */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value as number | "all")}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            label="Status"
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Format */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Format</InputLabel>
          <Select
            value={selectedFormat}
            label="Format"
            onChange={(e) => setSelectedFormat(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            {formats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        {/* Score Range */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom fontWeight={500} color="primary">
            Score Range
          </Typography>
          <Slider
            value={scoreRange}
            onChange={(_e, newValue) => setScoreRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            marks={[
              { value: 0, label: "0" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
            ]}
            sx={{
              "& .MuiSlider-thumb": {
                boxShadow: theme.shadows[2],
              },
            }}
          />
        </Box>

        {/* Episode Range */}
        <FormControlLabel
          control={
            <Switch
              checked={useEpisodeFilter}
              onChange={(e) => setUseEpisodeFilter(e.target.checked)}
            />
          }
          label="Episode Count Filter"
          sx={{ mb: 1 }}
        />
        {useEpisodeFilter && (
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom fontWeight={500} color="primary">
              Episode Count
            </Typography>
            <Slider
              value={episodeRange}
              onChange={(_e, newValue) => setEpisodeRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={1}
              max={200}
              marks={[
                { value: 1, label: "1" },
                { value: 12, label: "12" },
                { value: 24, label: "24" },
                { value: 50, label: "50+" },
              ]}
              sx={{
                "& .MuiSlider-thumb": {
                  boxShadow: theme.shadows[2],
                },
              }}
            />
          </Box>
        )}

        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleSearch}
            size="small"
            startIcon={<SearchIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 500,
              textTransform: "none",
              minHeight: 32,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: "none",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: theme.shadows[2],
              },
            }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={clearFilters}
            size="small"
            startIcon={<Clear />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 20,
              fontSize: "0.8rem",
              fontWeight: 500,
              textTransform: "none",
              minHeight: 32,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: theme.shadows[1],
              },
            }}
          >
            Reset
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <PageHeader
        title={getPageTitle()}
        subtitle="Search for animations based on your desired criteria"
        icon={<SearchIcon />}
        background={`linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`}
      />

      <Grid container spacing={3}>
        {/* Desktop Filters */}
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 120 }}>{renderFilters()}</Box>
          </Grid>
        )}

        {/* Mobile Filter Button */}
        {isMobile && (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Tune />}
              onClick={() => setMobileFiltersOpen(true)}
              sx={{ mb: 2, borderRadius: 2 }}
            >
              Filter Settings
            </Button>
          </Grid>
        )}

        {/* Search Results */}
        <Grid item xs={12} md={isMobile ? 12 : 8}>
          {loading && (
            <Grid container spacing={3}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} key={`skeleton-${index}`}>
                  <Card elevation={2} sx={{ borderRadius: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={isMobile ? "100%" : 220}
                        height={isMobile ? 200 : 300}
                        animation="wave"
                      />
                      <Box sx={{ p: 2, flex: 1 }}>
                        <Skeleton
                          variant="text"
                          height={32}
                          width="80%"
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          height={24}
                          width="60%"
                          sx={{ mb: 2 }}
                        />
                        <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                        <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
                        <Skeleton variant="text" height={16} width="40%" />
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {error && (
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
              <Typography color="error" variant="h6" gutterBottom>
                An error occurred during the search.
              </Typography>
              <Typography color="text.secondary">
                Please try again later.
              </Typography>
            </Paper>
          )}

          {data && (
            <>
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Search Results: {data.Page.pageInfo.total.toLocaleString()} items
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Page {page} / {data.Page.pageInfo.lastPage}
                  </Typography>
                </Stack>
              </Paper>

              <Grid container spacing={3}>
                {data.Page.media.map(
                  (
                    anime: {
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
                    },
                    index: number,
                  ) => (
                    <Grid item xs={12} key={anime.id}>
                      <Fade in timeout={300 + index * 50}>
                        <div>
                          <AnimationCard media={anime} />
                        </div>
                      </Fade>
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
                    size={isMobile ? "medium" : "large"}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "90vh",
          },
        }}
      >
        <Box sx={{ p: 2, maxHeight: "90vh", overflowY: "auto" }}>
          {renderFilters()}
        </Box>
      </Drawer>
    </Container>
  );
};

export default SearchPage;
