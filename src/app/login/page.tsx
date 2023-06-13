"use client";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";
import { initFirebase } from "@/firebase/app";
import { getAuth } from "firebase/auth";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import LoginDetails from "@/types/LoginDetails";

const Login = () => {
  initFirebase();
  const auth = getAuth();
  const [loggedInUser, loadingCheckAuthExist] = useAuthState(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = loginDetails.email;
    const pwd = loginDetails.password;
    await signInWithEmailAndPassword(email, pwd);
  };

  useEffect(() => {
    if (loggedInUser) router.push("/");
  }, [loggedInUser]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 3 }}>
      {loadingCheckAuthExist ? (
        <Card elevation={3}>
          <CardContent>
            <Stack
              direction="column"
              spacing={1}
              display="flex"
              justifyItems="center"
              alignItems="center"
            >
              <CircularProgress />
              <Typography variant="h6">
                Checking your login status...
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <LoginForm
          loginDetails={loginDetails}
          setLoginDetails={setLoginDetails}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default Login;
