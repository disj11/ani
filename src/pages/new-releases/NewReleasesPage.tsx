import React, { useState } from 'react';
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
  Chip
} from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import AnimationCard from '../trending/components/AnimationCard/AnimationCard';

const GET_NEW_RELEASES = gql`
  query GetNewReleases($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        sort: [START_DATE_DESC]
        type: ANIME
        season: $season
        seasonYear: $seasonYear
        status: RELEASING
      ) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        averageScore
        genres
        description
        bannerImage
        status
        episodes
        format
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

const seasons = [
  { value: 'WINTER', label: '겨울' },
  { value: 'SPRING', label: '봄' },
  { value: 'SUMMER', label: '여름' },
  { value: 'FALL', label: '가을' }
];

const NewReleasesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data, loading, error } = useQuery(GET_NEW_RELEASES, {
    variables: {
      page,
      perPage: 20,
      season: selectedSeason || undefined,
      seasonYear: selectedYear,
    },
    fetchPolicy: 'cache-and-network'
  });

  const handleSeasonChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSeason(event.target.value as string);
    setPage(1);
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as number);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        신작 애니메이션
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>연도</InputLabel>
            <Select
              value={selectedYear}
              label="연도"
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
            <InputLabel>시즌</InputLabel>
            <Select
              value={selectedSeason}
              label="시즌"
              onChange={handleSeasonChange}
            >
              <MenuItem value="">전체</MenuItem>
              {seasons.map((season) => (
                <MenuItem key={season.value} value={season.value}>
                  {season.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Chip 
            label="방영중만 표시" 
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
          데이터를 불러오는 중 오류가 발생했습니다.
        </Typography>
      )}

      {data && (
        <>
          <Box mb={2}>
            <Typography variant="h6">
              {selectedYear}년 {selectedSeason ? seasons.find(s => s.value === selectedSeason)?.label : '전체'} 신작: {data.Page.pageInfo.total}개
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {data.Page.media.map((anime: {
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