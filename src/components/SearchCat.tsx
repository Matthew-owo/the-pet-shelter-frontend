"use client";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NextLink from "next/link";

const SearchCat = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              router.push(`/search/${search}`);
            }
          }}
          placeholder="Search cat by name"
          fullWidth
        />
        <Button component={NextLink} href="/search/filter" variant="contained">
          Filter
        </Button>
      </Stack>
    </Container>
  );
};

export default SearchCat;
