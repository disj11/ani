import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Stack,
  Chip,
  Container,
  Skeleton,
  Card,
  Button,
} from "@mui/material";
import {
  CalendarToday,
  Refresh,
  AccessTime,
  ErrorOutline,
} from "@mui/icons-material";
import AnimationCard from "../trending/components/AnimationCard/AnimationCard";
import { useAiringAnimeScheduleQuery } from "./apis/schedule.api";
import { AiringAnime } from "./types/schedule.type";
import PageHeader from "../../commons/components/PageHeader";
import SectionHeader from "../../commons/components/SectionHeader";

// Weekday mapping (0: Sunday ~ 6: Saturday)
const WEEKDAYS = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
];

// To order as Mon~Sun
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

function getAiringWeekday(anime: AiringAnime): number | null {
  // airingSchedule.nodes[0].airingAt (Unix timestamp, 초 단위)
  const node = anime.airingSchedule?.nodes?.[0];
  if (!node || !node.airingAt) return null;
  const date = new Date(node.airingAt * 1000);
  return date.getDay(); // 0(일) ~ 6(토)
}

function groupByWeekday(animeList: AiringAnime[]) {
  // { 0: [...], 1: [...], ... }
  const result: Record<number, AiringAnime[]> = {};
  for (let i = 0; i < 7; i++) result[i] = [];
  animeList.forEach((anime) => {
    const weekday = getAiringWeekday(anime);
    if (weekday !== null) {
      result[weekday].push(anime);
    }
  });
  return result;
}

const SkeletonLoader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container spacing={theme.spacing(3)}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} md={12} lg={6} key={`skeleton-${index}`}>
          <Card elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
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
              <Box sx={{ p: theme.spacing(2), flex: 1 }}>
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
  );
};

const EmptyState: React.FC<{ weekday: string }> = ({ weekday }) => {
  const theme = useTheme();

  return (
    <Fade in>
      <Paper
        elevation={2}
        sx={{
          p: { xs: theme.spacing(4), md: theme.spacing(6) },
          textAlign: "center",
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        }}
      >
        <CalendarToday
          sx={{
            fontSize: { xs: 48, md: 64 },
            color: "text.secondary",
            mb: 2,
            opacity: 0.5,
          }}
        />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No anime airing on {weekday}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ opacity: 0.7 }}
        >
          Check back later or try a different day
        </Typography>
      </Paper>
    </Fade>
  );
};

const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const theme = useTheme();

  return (
    <Fade in>
      <Paper
        elevation={2}
        sx={{
          p: { xs: theme.spacing(4), md: theme.spacing(6) },
          textAlign: "center",
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        }}
      >
        <ErrorOutline
          sx={{
            fontSize: { xs: 48, md: 64 },
            color: "error.main",
            mb: 2,
            opacity: 0.8,
          }}
        />
        <Typography color="error" variant="h6" gutterBottom>
          Failed to load schedule data
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Please check your connection and try again
        </Typography>
        <Button
          variant="contained"
          onClick={onRetry}
          startIcon={<Refresh />}
          sx={{
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[8],
            },
          }}
        >
          Try Again
        </Button>
      </Paper>
    </Fade>
  );
};

const SchedulePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tab, setTab] = useState<number>(new Date().getDay()); // 오늘 요일로 초기화

  // 한 번에 100개까지 불러옴 (방영중 애니는 100개 내외)
  const { data, loading, error, refetch } = useAiringAnimeScheduleQuery({
    page: 1,
    perPage: 100,
  });

  // 요일별로 그룹화
  const weekdayMap = useMemo(() => {
    if (!data?.Page?.media) return {};
    return groupByWeekday(data.Page.media);
  }, [data]);

  // 탭 변경 핸들러
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // 현재 시간 표시
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSelectedWeekdayName = () => {
    const weekday = WEEKDAYS.find((w) => w.value === tab);
    return weekday ? weekday.label : "Unknown";
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <PageHeader
        title="Weekly Anime Schedule"
        subtitle="Check out currently airing anime by weekday!"
        icon={<CalendarToday fontSize={isMobile ? "medium" : "large"} />}
        background={`linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.primary.light})`}
      >
        <Box sx={{ mt: theme.spacing(1) }}>
          <Chip
            icon={<AccessTime fontSize="small" />}
            label={`Current time: ${getCurrentTime()}`}
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold",
              "& .MuiChip-icon": {
                color: "white",
              },
            }}
          />
        </Box>
      </PageHeader>

      {/* Weekday Tabs */}
      <Fade in timeout={500}>
        <Paper
          elevation={2}
          sx={{
            mb: theme.spacing(4),
            borderRadius: 3,
            background: theme.palette.background.paper,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
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
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              centered={!isMobile}
              sx={{
                "& .MuiTab-root": {
                  fontWeight: 600,
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                  minWidth: { xs: 80, sm: 100 },
                  padding: { xs: "12px 8px", sm: "12px 16px" },
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                },
                "& .MuiTab-selected": {
                  color: "primary.main",
                  fontWeight: 700,
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              {WEEKDAY_ORDER.map((weekday) => (
                <Tab
                  key={weekday}
                  label={
                    <Stack
                      direction={isMobile ? "column" : "row"}
                      alignItems="center"
                      spacing={isMobile ? 0.5 : 1}
                    >
                      <Typography
                        variant={isMobile ? "body2" : "body1"}
                        fontWeight="inherit"
                      >
                        {WEEKDAYS[weekday].label}
                      </Typography>
                      {weekdayMap[weekday]?.length > 0 && (
                        <Chip
                          label={weekdayMap[weekday].length}
                          size="small"
                          color="primary"
                          sx={{
                            fontWeight: "bold",
                            height: { xs: 16, sm: 20 },
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            minWidth: { xs: 16, sm: 20 },
                            "& .MuiChip-label": {
                              px: { xs: 0.5, sm: 1 },
                            },
                          }}
                        />
                      )}
                    </Stack>
                  }
                  value={weekday}
                />
              ))}
            </Tabs>
          </Box>
        </Paper>
      </Fade>

      {/* Main Content */}
      {loading ? (
        <Fade in timeout={300}>
          <Box>
            <Paper elevation={1} sx={{ p: theme.spacing(3), mb: theme.spacing(3), borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={theme.spacing(2)}>
                <CircularProgress size={24} />
                <Typography variant="h6" color="text.secondary">
                  Loading {getSelectedWeekdayName()}'s schedule...
                </Typography>
              </Stack>
            </Paper>
            <SkeletonLoader />
          </Box>
        </Fade>
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <Fade in timeout={300}>
          <Box>
            {weekdayMap[tab] && weekdayMap[tab].length > 0 ? (
              <>
                {/* Results Summary */}
                <SectionHeader
                  title={`${getSelectedWeekdayName()}'s Schedule`}
                  subtitle={`Airing anime: ${weekdayMap[tab].length}`}
                  icon={<CalendarToday />}
                  right={
                    <Stack direction="row" spacing={theme.spacing(1)}>
                      <Chip
                        label={`Updated: ${getCurrentTime()}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem" }}
                      />
                      {weekdayMap[tab].length > 0 && (
                        <Chip
                          label="Live"
                          size="small"
                          color="success"
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </Stack>
                  }
                />

                {/* Anime Cards */}
                <Grid container spacing={theme.spacing(3)}>
                  {weekdayMap[tab].map((anime, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      key={anime.id}
                    >
                      <Fade in timeout={300 + index * 100}>
                        <Box>
                          <AnimationCard media={anime} />
                        </Box>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <EmptyState weekday={getSelectedWeekdayName()} />
            )}
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default SchedulePage;
