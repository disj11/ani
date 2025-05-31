import React from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Divider,
  Button,
  Link as MuiLink
} from '@mui/material';
import { PlayArrow, Favorite, Star, CalendarToday } from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { useMediaDetailQuery } from './apis/detail.api';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mediaId = parseInt(id || '0', 10);
  const { data, loading, error } = useMediaDetailQuery(mediaId);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.Media) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <Typography variant="h6" color="error">
          미디어 정보를 불러올 수 없습니다.
        </Typography>
      </Box>
    );
  }

  const media = data.Media;

  const formatDate = (date: { year?: number; month?: number; day?: number }) => {
    if (!date.year) return '';
    const month = date.month ? String(date.month).padStart(2, '0') : '??';
    const day = date.day ? String(date.day).padStart(2, '0') : '??';
    return `${date.year}.${month}.${day}`;
  };

  return (
    <Box>
      {/* Banner Section */}
      {media.bannerImage && (
        <Box
          sx={{
            height: 300,
            backgroundImage: `url(${media.bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              p: 3,
            }}
          >
            <Typography variant="h3" color="white" fontWeight="bold">
              {media.title.userPreferred}
            </Typography>
          </Box>
        </Box>
      )}

      <Grid container spacing={3}>
        {/* Left Column - Cover Image and Basic Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={media.coverImage.extraLarge || media.coverImage.large}
              alt={media.title.userPreferred}
              sx={{ height: 600, objectFit: 'cover' }}
            />
            <CardContent>
              <Box mb={2}>
                {media.averageScore && (
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Rating value={media.averageScore / 20} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {media.averageScore}%
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>형식:</strong> {media.format}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>상태:</strong> {media.status}
                </Typography>
                {media.episodes && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>에피소드:</strong> {media.episodes}화
                  </Typography>
                )}
                {media.duration && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>러닝타임:</strong> {media.duration}분
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>방영일:</strong> {formatDate(media.startDate)}
                </Typography>
                {media.endDate?.year && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>종료일:</strong> {formatDate(media.endDate)}
                  </Typography>
                )}
              </Box>

              <Box mb={2}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  장르
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {media.genres.map((genre) => (
                    <Chip key={genre} label={genre} size="small" />
                  ))}
                </Box>
              </Box>

              {media.studios.nodes.length > 0 && (
                <Box mb={2}>
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    제작사
                  </Typography>
                  {media.studios.nodes.map((studio) => (
                    <Typography key={studio.id} variant="body2" color="text.secondary">
                      {studio.name}
                    </Typography>
                  ))}
                </Box>
              )}

              {media.trailer && (
                <Box mb={2}>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    fullWidth
                    href={`https://www.youtube.com/watch?v=${media.trailer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    트레일러 보기
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Main Content */}
        <Grid item xs={12} md={8}>
          {/* Title and Description */}
          <Box mb={3}>
            {!media.bannerImage && (
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {media.title.userPreferred}
              </Typography>
            )}
            {media.title.english && media.title.english !== media.title.userPreferred && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {media.title.english}
              </Typography>
            )}
            {media.title.native && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {media.title.native}
              </Typography>
            )}
            
            {media.description && (
              <Typography
                variant="body1"
                sx={{ mt: 2, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(media.description),
                }}
              />
            )}
          </Box>

          {/* Statistics */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              통계
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="primary">
                    {media.averageScore || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    평균 점수
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="primary">
                    {media.popularity || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    인기도
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="primary">
                    {media.favourites || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    즐겨찾기
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="primary">
                    #{media.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Characters */}
          {media.characters.nodes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                캐릭터
              </Typography>
              <Grid container spacing={1}>
                {media.characters.nodes.slice(0, 8).map((character) => (
                  <Grid item xs={6} sm={4} md={3} key={character.id}>
                    <Box textAlign="center">
                      <Avatar
                        src={character.image?.medium}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                      />
                      <Typography variant="body2" noWrap>
                        {character.name.userPreferred}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Staff */}
          {media.staff.nodes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                제작진
              </Typography>
              <Grid container spacing={1}>
                {media.staff.nodes.slice(0, 8).map((staff) => (
                  <Grid item xs={6} sm={4} md={3} key={staff.id}>
                    <Box textAlign="center">
                      <Avatar
                        src={staff.image?.medium}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                      />
                      <Typography variant="body2" noWrap>
                        {staff.name.userPreferred}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Recommendations */}
          {media.recommendations.nodes.length > 0 && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                추천 작품
              </Typography>
              <Grid container spacing={2}>
                {media.recommendations.nodes.slice(0, 6).map((rec, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <Box 
                      textAlign="center" 
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/detail/${rec.mediaRecommendation.id}`)}
                    >
                      <img
                        src={rec.mediaRecommendation.coverImage.medium}
                        alt={rec.mediaRecommendation.title.userPreferred}
                        style={{
                          width: '100%',
                          height: 150,
                          objectFit: 'cover',
                          borderRadius: 4,
                          marginBottom: 8,
                        }}
                      />
                      <Typography variant="body2" noWrap>
                        {rec.mediaRecommendation.title.userPreferred}
                      </Typography>
                      {rec.mediaRecommendation.averageScore && (
                        <Typography variant="caption" color="text.secondary">
                          {rec.mediaRecommendation.averageScore}%
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* External Links */}
          {media.externalLinks.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                외부 링크
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {media.externalLinks.map((link) => (
                  <Button
                    key={link.id}
                    variant="outlined"
                    size="small"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.site}
                  </Button>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPage;