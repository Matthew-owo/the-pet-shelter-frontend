"use client";
import { Stack, Button } from "@mui/material";
import NextLink from "next/link";

const LoginRegisterButton = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        color="secondary"
        component={NextLink}
        href="/login"
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={NextLink}
        href="/register"
      >
        Register
      </Button>
    </Stack>
  );
};

export default LoginRegisterButton;
