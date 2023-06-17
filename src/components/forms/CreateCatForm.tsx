"use client";

import { initFirebase } from "@/firebase/app";
import CreateCatDetails from "@/types/CreateCatDetails";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Divider,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth } from "firebase/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Cat from "@/types/Cat";

const CreateCatForm = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const [newCat, setNewCat] = useState<CreateCatDetails>({
    name: "",
    age: 1,
    breed: "",
    image: null,
  });

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState<boolean>(false);
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, age, breed, image } = newCat;

    if (!name || age <= 0 || !breed || !image) {
      setErrorMessage("Please input all required cat information.");
      setIsErrorAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", newCat.name);
    formData.append("age", newCat.age.toString());
    formData.append("breed", newCat.breed);
    formData.append("image", newCat.image!);

    const token = await user?.getIdToken();

    try {
      const response = await fetch("http://localhost:10888/api/v1/cat/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setIsSuccessAlertOpen(true);
        setNewCat({
          name: "",
          age: 1,
          breed: "",
          image: null,
        });
      } else {
        const res = await response.json();
        console.log(res);
        setErrorMessage(res.message);
        setIsErrorAlertOpen(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error as string);
      setIsErrorAlertOpen(true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewCat({ ...newCat, image: event.target.files[0] });
    }
  };

  useEffect(() => {
    console.log({ newCat });
  }, [newCat]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={1}>
        <Collapse in={isSuccessAlertOpen}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setIsSuccessAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Success</AlertTitle>
            New cat is created
          </Alert>
        </Collapse>
        <Collapse in={isErrorAlertOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setIsErrorAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </Collapse>
        <TextField
          id="name"
          label="Cat Name *"
          variant="outlined"
          value={newCat.name}
          onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
        />
        <TextField
          id="age"
          label="Age *"
          variant="outlined"
          type="number"
          value={newCat.age}
          onChange={(e) =>
            setNewCat({ ...newCat, age: Number(e.target.value) })
          }
        />
        <TextField
          id="breed"
          label="Breed *"
          variant="outlined"
          value={newCat.breed}
          onChange={(e) => setNewCat({ ...newCat, breed: e.target.value })}
        />
        <Divider />
        <Typography variant="h6" color="text.secondary">
          Cat Image
        </Typography>
        <TextField type="file" onChange={handleChange} />
        <Button type="submit" variant="contained" color="success">
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CreateCatForm;
