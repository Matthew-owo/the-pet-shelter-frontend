"use client";
import Cat from "@/types/Cat";
import { useEffect, useState } from "react";
import CatCard from "./CatCard";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import CatLoadingCard from "./CatLoadingCard";

const FilterCatList: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [result, setResult] = useState<Cat[]>([]);

  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectedBreed(e.target.value);
  };

  const fetchCats = async () => {
    const response = await fetch("http://localhost:10888/api/v1/cat");
    const catsData: Cat[] = await response.json();

    setCats(catsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    const c = cats.filter((cat) => {
      return cat.breed === selectedBreed;
    });
    setResult(c);
  }, [selectedBreed]);

  return (
    <Stack direction="column" spacing={2} mt={2}>
      <Container>
        <FormControl fullWidth>
          <InputLabel>Breed</InputLabel>
          <Select value={selectedBreed} label="Breed" onChange={handleChange}>
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Abyssinian"}>Abyssinian</MenuItem>
            <MenuItem value={"Aegean"}>Aegean</MenuItem>
            <MenuItem value={"Bengal"}>Bengal</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Grid container spacing={2} direction="row" mt={2}>
        {(loading
          ? Array.from(new Array(8))
          : result.length > 0
          ? result
          : cats
        ).map((cat: Cat, index) => (
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
    </Stack>
  );
};

export default FilterCatList;
