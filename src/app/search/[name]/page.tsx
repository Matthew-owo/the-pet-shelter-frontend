"use client";
import CatCard from "@/components/CatCard";
import CatLoadingCard from "@/components/CatLoadingCard";
import Cat from "@/types/Cat";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const SearchByNameResult = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Cat[]>([]);

  const fetchSearch = async () => {
    const response = await fetch(
      `http://localhost:10888/api/v1/cat/query/${params.name}`
    );

    if (response.ok) {
      const data = await response.json() as Cat[];
      setResult(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, []);

  return (
    <Grid container spacing={2} direction="row" mt={2}>
      {(loading ? Array.from(new Array(8)) : result).map((cat: Cat, index) => (
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

export default SearchByNameResult;
