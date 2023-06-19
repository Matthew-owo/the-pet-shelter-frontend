"use client";
import Cat from "@/types/Cat";
import { useEffect, useState } from "react";
import CatCard from "./CatCard";
import { Grid } from "@mui/material";
import CatLoadingCard from "./CatLoadingCard";
import { initFirebase } from "@/firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import UserFavorite from "@/types/UserFavorite";

const CatList: React.FC = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loadingCheckAuthExist] = useAuthState(auth);

  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:10888/api/v1/cat");
    const catsData: Cat[] = await response.json();

    setCats(catsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Grid container spacing={2} direction="row" mt={2}>
      {(loading ? Array.from(new Array(8)) : cats).map((cat: Cat, index) => (
        <Grid
          item
          xs={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {cat ? (
            <CatCard
              id={cat.id!}
              name={cat.name}
              age={cat.age}
              breed={cat.breed}
              image={cat.image}
            />
          ) : (
            <CatLoadingCard />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default CatList;
