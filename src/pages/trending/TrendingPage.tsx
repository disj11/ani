import Grid from "@mui/material/Grid2";
import { useTrendingQuery } from "./apis/trending.api";
import AnimationCard from "./components/AnimationCard";
import useTrendSearchParamState from "./stores/trendSearchParamState";
import { Media } from "./types/trending.type";
import { Box, CircularProgress, Typography } from "@mui/material";

const Animations = ({ media }: { media: Media[]; loading?: boolean }) => {
  const AnimationCards = () =>
    media.map((media) => (
      <Grid size={{ md: 12, lg: 6 }} key={`animation-cards-${media.id}`}>
        <AnimationCard media={media} />
      </Grid>
    ));

  return (
    <Grid container spacing={3}>
      <AnimationCards />
    </Grid>
  );
};

const TrendingPage = () => {
  const { searchParams } = useTrendSearchParamState();
  const { data, loading } = useTrendingQuery(searchParams);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        height={"50%"}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box mb={5}>
        <Typography variant="h6" gutterBottom>
          실시간 인기 애니
        </Typography>
        <Animations media={data?.trending.media || []} />
      </Box>
      <Box mb={5}>
        <Typography variant="h6" gutterBottom>
          이번 분기 인기 애니
        </Typography>
        <Animations media={data?.season.media || []} />
      </Box>
      <Box mb={5}>
        <Typography variant="h6" gutterBottom>
          다음 분기 애니
        </Typography>
        <Animations media={data?.nextSeason.media || []} />
      </Box>
      <Box mb={5}>
        <Typography variant="h6" gutterBottom>
          역대 인기 애니
        </Typography>
        <Animations media={data?.popular.media || []} />
      </Box>
    </>
  );
};

export default TrendingPage;
