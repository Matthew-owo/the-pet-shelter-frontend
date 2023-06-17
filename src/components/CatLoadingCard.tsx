"use client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Skeleton,
} from "@mui/material";

const CatLoadingCard: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345, width: 345 }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={345}
        height={250}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Skeleton />
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Skeleton />
        </Typography>
      </CardContent>
      <CardActions>
        <Skeleton width={100} />
      </CardActions>
    </Card>
  );
};

export default CatLoadingCard;
