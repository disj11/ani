import { Box, Link, Rating } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DOMPurify from "dompurify";
import { Media } from "../../types/trending.type";

interface AnimationCardProps {
  media: Media;
}

const AnimationCard = ({ media }: AnimationCardProps) => {
  return (
    <Card>
      <Box display="flex">
        <CardMedia
          component="img"
          image={media.coverImage.large}
          sx={{
            width: 240,
            height: 300,
            objectFit: "cover",
          }}
          alt={media.title.userPreferred}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {media.title.userPreferred}
          </Typography>
          <Box mb={1}>
            {media.averageScore && (
              <Rating value={media.averageScore / 20} readOnly />
            )}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 7,
              WebkitBoxOrient: "vertical",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(media.description || ""),
            }}
          />
          <Box display="flex" justifyContent="end" mt={3}>
            <Link component="button" variant="body2" color="primary">
              자세히 보기
            </Link>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default AnimationCard;
