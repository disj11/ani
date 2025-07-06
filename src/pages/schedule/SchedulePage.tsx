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
  Tooltip,
  IconButton,
} from "@mui/material";
import { CalendarToday, Refresh } from "@mui/icons-material";
import AnimationCard from "../trending/components/AnimationCard/AnimationCard";
import { useAiringAnimeScheduleQuery, AiringAnime } from "./apis/schedule.api";

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

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.info.light}, ${theme.palette.primary.light})`,
          color: "white",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <CalendarToday fontSize="large" />
          <Box flex={1}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              gutterBottom
              sx={{ color: "white" }}
            >
              Weekly Anime Schedule
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Check out currently airing anime by weekday!
            </Typography>
          </Box>
          <Tooltip title="Refresh">
            <IconButton
              onClick={() => refetch()}
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                ml: 2,
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {/* Weekday Tabs */}
      <Paper
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 3,
          background: theme.palette.background.paper,
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          centered={!isMobile}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              fontSize: isMobile ? "1rem" : "1.1rem",
              minWidth: 60,
            },
          }}
        >
          {WEEKDAY_ORDER.map((weekday) => (
            <Tab
              key={weekday}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>{WEEKDAYS[weekday].label}</span>
                  {weekdayMap[weekday]?.length > 0 && (
                    <Chip
                      label={weekdayMap[weekday].length}
                      size="small"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        height: 20,
                        fontSize: "0.8rem",
                        ml: 0.5,
                      }}
                    />
                  )}
                </Stack>
              }
              value={weekday}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Main Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography color="error" variant="h6" gutterBottom>
            Failed to load data.
          </Typography>
          <Typography color="text.secondary">
            Please try again later.
          </Typography>
        </Paper>
      ) : (
        <Fade in>
          <Box>
            {weekdayMap[tab] && weekdayMap[tab].length > 0 ? (
              <Grid container spacing={3}>
                {weekdayMap[tab].map((anime) => (
                  <Grid item xs={12} key={anime.id}>
                    <AnimationCard media={anime} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary">
                  No anime airing on this day.
                </Typography>
              </Paper>
            )}
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default SchedulePage;
