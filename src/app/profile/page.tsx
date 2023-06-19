"use client";
import { initFirebase } from "@/firebase/app";
import Cat from "@/types/Cat";
import UserFavorite from "@/types/UserFavorite";
import {
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loadingCheckAuthExist] = useAuthState(auth);

  const [userFavorite, setUserFavorite] = useState<UserFavorite[]>([]);
  const [favoriteCat, setFavoriteCat] = useState<Cat[]>([]);

  const fetchFavorite = async () => {
    setUserFavorite([]);
    const userId = user?.uid;
    const idToken = await user?.getIdToken();

    const response = await fetch(
      "http://localhost:10888/api/v1/users/getFavorite",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setUserFavorite(data);
    }
  };

  const fetchCat = async (userFavs: UserFavorite[]) => {
    const favCat: Cat[] = [];
    userFavs.map(async (fav) => {
      const response = await fetch(
        `http://localhost:10888/api/v1/cat/${fav.catId}`
      );

      if (response.ok) {
        const cat = await response.json();
        favCat.push(cat);
      }
    });

    setTimeout(() => {
      setFavoriteCat(favCat);
    }, 1500);
  };

  useEffect(() => {
    if (user) fetchFavorite();
  }, [user]);

  useEffect(() => {
    if (userFavorite.length > 0) {
      fetchCat(userFavorite);
    }
  }, [userFavorite]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" marginBottom={1.5}>
            My Favorite
          </Typography>
          {
            <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Cat Name</TableCell>
                    <TableCell>Cat Age</TableCell>
                    <TableCell>Cat Breed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favoriteCat.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.breed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
