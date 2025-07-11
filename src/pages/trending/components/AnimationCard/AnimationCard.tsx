import {
  Box,
  Link,
  Rating,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
  CardActionArea,
  Stack,
  Tooltip,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router";
import { Media } from "../../types/trending.type";

interface AnimationCardProps {
  media: Media;
}

const AnimationCard = ({ media }: AnimationCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDetailClick = () => {
    navigate(`/detail/${media.id}`);
  };

  const handleCardClick = () => {
    navigate(`/detail/${media.id}`);
  };

  const getImageDimensions = () => {
    if (isMobile) {
      return { width: 120, height: 170 };
    }
    if (isMobile) {
      return { width: 180, height: 240 };
    }
    return { width: 220, height: 300 };
  };

  const { width: imageWidth, height: imageHeight } = getImageDimensions();

  return (
    <Fade in timeout={300}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          borderRadius: 3,
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[8],
            "& .MuiCardMedia-root": {
              transform: "scale(1.05)",
            },
            "& .action-buttons": {
              opacity: 1,
            },
          },
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        }}
        elevation={3}
      >
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <CardActionArea onClick={handleCardClick}>
            <CardMedia
              component="img"
              image={media.coverImage.large}
              sx={{
                width: { xs: "100%", sm: imageWidth },
                height: { xs: 200, sm: imageHeight },
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
              }}
              alt={media.title.userPreferred}
            />
          </CardActionArea>

          {/* Overlay with quick actions */}
          <Box
            className="action-buttons"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              opacity: { xs: 1, sm: 0 },
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(0.5),
            }}
          >
            <Tooltip title="관심목록에 추가">
              <IconButton
                size="small"
                sx={{
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(0,0,0,0.8)",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Favorite fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="공유">
              <IconButton
                size="small"
                sx={{
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(0,0,0,0.8)",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Share fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Score badge */}
          {media.averageScore && (
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                borderRadius: 2,
                px: theme.spacing(1),
                py: theme.spacing(0.5),
                fontSize: "0.75rem",
                fontWeight: "bold",
                boxShadow: theme.shadows[4],
              }}
            >
              ★ {media.averageScore}
            </Box>
          )}
        </Box>

        <CardContent
          sx={{
            flex: 1,
            p: { xs: theme.spacing(2), sm: theme.spacing(3) },
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Title */}
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: { xs: 2, sm: 1 },
              WebkitBoxOrient: "vertical",
              mb: theme.spacing(1),
              lineHeight: 1.3,
            }}
          >
            {media.title.userPreferred}
          </Typography>

          {/* Rating and Status */}
          <Stack direction="row" spacing={theme.spacing(1)} alignItems="center" sx={{ mb: theme.spacing(2) }}>
            {media.averageScore && (
              <Rating
                value={media.averageScore / 20}
                readOnly
                size={isMobile ? "small" : "medium"}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: theme.palette.warning.main,
                  },
                }}
              />
            )}
            <Chip
              label={media.status}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 20,
                borderRadius: 2,
              }}
            />
          </Stack>

          {/* Genres */}
          <Box sx={{ mb: theme.spacing(2) }}>
            <Stack
              direction="row"
              spacing={theme.spacing(0.5)}
              sx={{ flexWrap: "wrap", gap: theme.spacing(0.5) }}
            >
              {media.genres.slice(0, isMobile ? 2 : 3).map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  variant="filled"
                  sx={{
                    fontSize: "0.65rem",
                    height: 18,
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              ))}
              {media.genres.length > (isMobile ? 2 : 3) && (
                <Chip
                  label={`+${media.genres.length - (isMobile ? 2 : 3)}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.65rem", height: 18 }}
                />
              )}
            </Stack>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
              WebkitBoxOrient: "vertical",
              lineHeight: 1.5,
              flex: 1,
              mb: theme.spacing(2),
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                media.description || "No description available.",
              ),
            }}
          />

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Box />

            <Link
              component="button"
              variant="body2"
              color="primary"
              onClick={handleDetailClick}
              sx={{
                textDecoration: "none",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 2,
                border: `1px solid ${theme.palette.primary.main}`,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  transform: "translateY(-1px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              View Details
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default AnimationCard;
