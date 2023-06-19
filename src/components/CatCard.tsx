"use client";
import { initFirebase } from "@/firebase/app";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

type CatCardType = {
  id: string;
  name: string;
  age: number;
  breed: string;
  image: string;
};

const CatCard: React.FC<CatCardType> = ({ id, name, age, breed, image }) => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const handleAddFavorite = async () => {
    const userId = user?.uid;
    const catId = id;

    const idToken = await user?.getIdToken();

    const response = await fetch(
      "http://localhost:10888/api/v1/users/addFavorite",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, catId }),
      }
    );

    if (response.ok) {
      console.log("OK");
    } else {
      const res = await response.json();
      console.log(res.message);
    }
  };

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
        <Button size="small" onClick={handleAddFavorite}>
          Add Favorite
        </Button>
      </CardActions>
    </Card>
  );
};

export default CatCard;
