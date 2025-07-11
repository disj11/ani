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
  CircularProgress,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  PlayArrow, 
  Favorite, 
  Share, 
  ArrowBack,
  CalendarToday,
  AccessTime
} from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { useMediaDetailQuery } from './apis/detail.api';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mediaId = parseInt(id || '0', 10);
  const { data, loading, error } = useMediaDetailQuery(mediaId);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error || !data?.Media) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50vh">
          <Typography variant="h6" color="error" gutterBottom>
            Unable to load media information.
          </Typography>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Box>
      </Container>
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
    <Container maxWidth="xl">
      {/* Back Button */}
      <Box sx={{ mb: theme.spacing(2) }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary' }}
        >
          Go Back
        </Button>
      </Box>

      {/* Banner Section */}
      {media.bannerImage && (
        <Paper
          elevation={4}
          sx={{
            height: { xs: 200, md: 300 },
            backgroundImage: `url(${media.bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            mb: theme.spacing(3),
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              p: { xs: theme.spacing(2), md: theme.spacing(3) },
            }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              color="white" 
              fontWeight="bold"
              sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              {media.title.userPreferred}
            </Typography>
          </Box>
        </Paper>
      )}

      <Grid container spacing={theme.spacing(3)}>
        {/* Left Column - Cover Image and Basic Info */}
        <Grid item xs={12} md={4}>
          <Stack spacing={theme.spacing(3)}>
            <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={media.coverImage.extraLarge || media.coverImage.large}
                alt={media.title.userPreferred}
                sx={{ 
                  height: { xs: 400, md: 600 }, 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Card>

            <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
              {/* Rating */}
              {media.averageScore && (
                <Box sx={{ mb: theme.spacing(3), textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {media.averageScore}%
                  </Typography>
                  <Rating 
                    value={media.averageScore / 20} 
                    readOnly 
                    size="large"
                    sx={{ 
                      mt: 1,
                      '& .MuiRating-iconFilled': { 
                        color: theme.palette.warning.main 
                      }
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                </Box>
              )}

              <Divider sx={{ mb: theme.spacing(2) }} />

              {/* Basic Info */}
              <Stack spacing={theme.spacing(2)}>
                <Box>
                  <Typography variant="subtitle2" color="primary" fontWeight="bold">
                    Format
                  </Typography>
                  <Typography variant="body2">
                    {media.format}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" fontWeight="bold">
                    Status
                  </Typography>
                  <Chip 
                    label={media.status} 
                    size="small" 
                    color={media.status === 'RELEASING' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </Box>

                {media.episodes && (
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      Episodes
                    </Typography>
                    <Typography variant="body2">
                      {media.episodes} episodes
                    </Typography>
                  </Box>
                )}

                {media.duration && (
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      Runtime
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={theme.spacing(1)}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2">
                        {media.duration} minutes
                      </Typography>
                    </Stack>
                  </Box>
                )}

                <Box>
                  <Typography variant="subtitle2" color="primary" fontWeight="bold">
                    Air Date
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={theme.spacing(1)}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2">
                      {formatDate(media.startDate)}
                    </Typography>
                  </Stack>
                </Box>

                {media.endDate?.year && (
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      End Date
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="body2">
                        {formatDate(media.endDate)}
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </Stack>

              <Divider sx={{ my: theme.spacing(2) }} />

              {/* Genres */}
              <Box>
                <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                  Genre
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={theme.spacing(0.5)}>
                  {media.genres.map((genre: string) => (
                    <Chip 
                      key={genre} 
                      label={genre} 
                      size="small" 
                      variant="filled"
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Studios */}
              {media.studios.nodes.length > 0 && (
                <>
                  <Divider sx={{ my: theme.spacing(2) }} />
                  <Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold" gutterBottom>
                      Studio
                    </Typography>
                    {media.studios.nodes.map((studio: { id: number; name: string }) => (
                      <Chip
                        key={studio.id}
                        label={studio.name}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </>
              )}

              {/* Action Buttons */}
              <Stack spacing={theme.spacing(2)} sx={{ mt: 3 }}>
                {media.trailer && (
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    fullWidth
                    href={`https://www.youtube.com/watch?v=${media.trailer.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[8]
                      }
                    }}
                  >
                    Watch Trailer
                  </Button>
                )}
                
                <Stack direction="row" spacing={theme.spacing(1)}>
                  <Tooltip title="Add to Favorites">
                    <IconButton
                      sx={{
                        flex: 1,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'error.light',
                          color: 'error.contrastText'
                        }
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton
                      sx={{
                        flex: 1,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText'
                        }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column - Main Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={theme.spacing(3)}>
            {/* Title and Description */}
            <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
              {!media.bannerImage && (
                <Typography variant={isMobile ? "h5" : "h4"} gutterBottom fontWeight="bold">
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
                  sx={{ mt: theme.spacing(2), lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(media.description),
                  }}
                />
              )}
            </Paper>

            {/* Statistics */}
            <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Statistics
              </Typography>
              <Grid container spacing={theme.spacing(2)}>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: theme.spacing(2), textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {media.averageScore || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Score
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: theme.spacing(2), textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {media.popularity?.toLocaleString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Popularity
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: theme.spacing(2), textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {media.favourites?.toLocaleString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Favorites
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={1} sx={{ p: theme.spacing(2), textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      #{media.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>

            {/* Characters */}
            {media.characters.nodes.length > 0 && (
              <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                  Characters
                </Typography>
                <Grid container spacing={theme.spacing(2)}>
                  {media.characters.nodes.slice(0, isMobile ? 4 : 8).map((character: { id: number; name: { userPreferred: string }; image?: { medium: string } }) => (
                    <Grid item xs={6} sm={4} md={3} key={character.id}>
                      <Card 
                        elevation={1} 
                        sx={{ 
                          p: theme.spacing(2), 
                          textAlign: 'center', 
                          borderRadius: 2,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[4]
                          }
                        }}
                      >
                        <Avatar
                          src={character.image?.medium}
                          sx={{ 
                            width: { xs: 60, md: 80 }, 
                            height: { xs: 60, md: 80 }, 
                            mx: 'auto', 
                            mb: 1,
                            boxShadow: theme.shadows[2]
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          noWrap
                          sx={{ 
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {character.name.userPreferred}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* Staff */}
            {media.staff.nodes.length > 0 && (
              <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                  Staff
                </Typography>
                <Grid container spacing={theme.spacing(2)}>
                  {media.staff.nodes.slice(0, isMobile ? 4 : 8).map((staff: { id: number; name: { userPreferred: string }; image?: { medium: string } }) => (
                    <Grid item xs={6} sm={4} md={3} key={staff.id}>
                      <Card 
                        elevation={1} 
                        sx={{ 
                          p: theme.spacing(2), 
                          textAlign: 'center', 
                          borderRadius: 2,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[4]
                          }
                        }}
                      >
                        <Avatar
                          src={staff.image?.medium}
                          sx={{ 
                            width: { xs: 60, md: 80 }, 
                            height: { xs: 60, md: 80 }, 
                            mx: 'auto', 
                            mb: 1,
                            boxShadow: theme.shadows[2]
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          noWrap
                          sx={{ 
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {staff.name.userPreferred}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* Recommendations */}
            {media.recommendations.nodes.length > 0 && (
              <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                  Recommended Works
                </Typography>
                <Grid container spacing={theme.spacing(2)}>
                  {media.recommendations.nodes.slice(0, isMobile ? 3 : 6).map((rec: { mediaRecommendation: { id: number; title: { userPreferred: string }; coverImage: { medium: string }; averageScore?: number } }, index: number) => (
                    <Grid item xs={4} sm={4} md={2} key={index}>
                      <Card
                        elevation={1}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[4]
                          }
                        }}
                        onClick={() => navigate(`/detail/${rec.mediaRecommendation.id}`)}
                      >
                        <CardMedia
                          component="img"
                          src={rec.mediaRecommendation.coverImage.medium}
                          alt={rec.mediaRecommendation.title.userPreferred}
                          sx={{
                            height: { xs: 120, md: 150 },
                            objectFit: 'cover',
                          }}
                        />
                        <CardContent sx={{ p: theme.spacing(1) }}>
                          <Typography 
                            variant="caption" 
                            noWrap
                            sx={{ 
                              display: 'block',
                              fontWeight: 500,
                              mb: 0.5
                            }}
                          >
                            {rec.mediaRecommendation.title.userPreferred}
                          </Typography>
                          {rec.mediaRecommendation.averageScore && (
                            <Typography variant="caption" color="text.secondary">
                              ★ {rec.mediaRecommendation.averageScore}%
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* External Links */}
            {media.externalLinks.length > 0 && (
              <Paper elevation={2} sx={{ p: theme.spacing(3), borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                  External Links
                </Typography>
                <Stack direction="row" spacing={theme.spacing(1)} sx={{ flexWrap: 'wrap', gap: theme.spacing(1) }}>
                  {media.externalLinks.map((link: { id: number; url: string; site: string }) => (
                    <Button
                      key={link.id}
                      variant="outlined"
                      size="small"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4]
                        }
                      }}
                    >
                      {link.site}
                    </Button>
                  ))}
                </Stack>
              </Paper>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailPage;