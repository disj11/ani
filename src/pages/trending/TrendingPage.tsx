import Grid from "@mui/material/Grid2";
import { useTrendingQuery } from "./apis/trending.api";
import AnimationCard from "./components/AnimationCard";
import useTrendSearchParamState from "./stores/trendSearchParamState";
import { Media } from "./types/trending.type";
import {
  Box,
  Typography,
  Container,
  Paper,
  Fade,
  useTheme,
  useMediaQuery,
  Skeleton,
  Stack,
  Chip,
} from "@mui/material";
import { TrendingUp, Schedule, Star, Whatshot } from "@mui/icons-material";

const Animations = ({
  media,
  loading,
}: {
  media: Media[];
  loading?: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid size={{ xs: 12, md: 12, lg: 6 }} key={`skeleton-${index}`}>
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
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
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {media.map((item, index) => (
        <Grid
          size={{ xs: 12, md: 12, lg: 6 }}
          key={`animation-cards-${item.id}`}
        >
          <Fade in timeout={300 + index * 100}>
            <div>
              <AnimationCard media={item} />
            </div>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

const TrendingPage = () => {
  const { searchParams } = useTrendSearchParamState();
  const { data, loading } = useTrendingQuery(searchParams);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sections = [
    {
      title: "Real-time Popular Anime",
      subtitle: "The most watched anime right now",
      data: data?.trending.media || [],
      icon: <Whatshot />,
      color: theme.palette.error.main,
      gradient: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
    },
    {
      title: "This Season's Popular Anime",
      subtitle: "Popular works of the current season",
      data: data?.season.media || [],
      icon: <TrendingUp />,
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    },
    {
      title: "Next Season's Anime",
      subtitle: "Upcoming anticipated works",
      data: data?.nextSeason.media || [],
      icon: <Schedule />,
      color: theme.palette.info.main,
      gradient: `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.info.main})`,
    },
    {
      title: "All-time Popular Anime",
      subtitle: "The most beloved works of all time",
      data: data?.popular.media || [],
      icon: <Star />,
      color: theme.palette.warning.main,
      gradient: `linear-gradient(135deg, ${theme.palette.warning.light}, ${theme.palette.warning.main})`,
    },
  ];

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" height={48} width="60%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={24} width="40%" />
        </Box>
        {sections.map((_, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: theme.palette.background.paper,
              }}
            >
              <Skeleton variant="text" height={32} width="30%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="50%" />
            </Paper>
            <Animations media={[]} loading={true} />
          </Box>
        ))}
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: { xs: "none", md: "block" },
          }}
        />
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight="bold"
          gutterBottom
          sx={{ position: "relative", zIndex: 1 }}
        >
          Trending Anime
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{
            opacity: 0.9,
            position: "relative",
            zIndex: 1,
            maxWidth: "600px",
          }}
        >
          Discover the most popular anime right now and find new works
        </Typography>
      </Paper>

      {/* Sections */}
      {sections.map((section, sectionIndex) => (
        <Fade in timeout={300 + sectionIndex * 200} key={section.title}>
          <Box sx={{ mb: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: section.gradient,
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ position: "relative", zIndex: 1 }}
              >
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
                  }}
                >
                  {section.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    fontWeight="bold"
                    gutterBottom
                  >
                    {section.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {section.subtitle}
                  </Typography>
                </Box>
                <Chip
                  label={`${section.data.length} items`}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Stack>
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  right: -30,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Paper>
            <Animations media={section.data} loading={loading} />
          </Box>
        </Fade>
      ))}
    </Container>
  );
};

export default TrendingPage;
