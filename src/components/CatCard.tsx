"use client";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

type CatCardType = {
  id: string;
  name: string;
  age: number;
  breed: string;
  image: string;
};

const CatCard: React.FC<CatCardType> = ({ id, name, age, breed, image }) => {
  return (
    <Card sx={{ maxWidth: 345, width: 345 }}>
      <CardMedia
        sx={{
          height: 250,
          backgroundSize: "cover",
          objectFit: "contain",
        }}
        image={image}
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Age: {age}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Breed: {breed}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CatCard;
