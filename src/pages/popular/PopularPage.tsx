import React, { useState, useEffect } from 'react';
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
  Paper
} from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router';
import AnimationCard from '../trending/components/AnimationCard/AnimationCard';

const GET_POPULAR_ANIME = gql`
  query GetPopularAnime($sort: [MediaSort], $page: Int, $perPage: Int, $year: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(sort: $sort, type: ANIME, seasonYear: $year) {
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
      }
    }
  }
`;

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
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [page, setPage] = useState(1);

  const sortOptions = [
    'POPULARITY_DESC',
    'SCORE_DESC',
    'TRENDING_DESC',
    'FAVOURITES_DESC'
  ];

  useEffect(() => {
    if (location.pathname === '/top-rated') {
      setTabValue(1); // Set to score tab for top-rated
    }
  }, [location.pathname]);

  const { data, loading, error } = useQuery(GET_POPULAR_ANIME, {
    variables: {
      sort: [sortOptions[tabValue]],
      page,
      perPage: 20,
      year: selectedYear || undefined,
    },
    fetchPolicy: 'cache-and-network'
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const getPageTitle = () => {
    if (location.pathname === '/top-rated') return '높은 평점 순위';
    return '인기 순위';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {getPageTitle()}
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="인기도" />
            <Tab label="평점" />
            <Tab label="트렌딩" />
            <Tab label="즐겨찾기" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>연도</InputLabel>
            <Select
              value={selectedYear}
              label="연도"
              onChange={handleYearChange}
            >
              <MenuItem value="">전체</MenuItem>
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
          인기도 순위 {selectedYear && `(${selectedYear}년)`}
        </Typography>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          평점 순위 {selectedYear && `(${selectedYear}년)`}
        </Typography>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          트렌딩 순위 {selectedYear && `(${selectedYear}년)`}
        </Typography>
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          즐겨찾기 순위 {selectedYear && `(${selectedYear}년)`}
        </Typography>
      </TabPanel>

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
            }, index: number) => (
              <Grid item xs={12} key={anime.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography 
                    variant="h4" 
                    color="primary" 
                    fontWeight="bold"
                    sx={{ minWidth: 60, textAlign: 'center' }}
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