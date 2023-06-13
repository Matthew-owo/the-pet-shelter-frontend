"use client";
import RegistrationDetails from "@/types/RegistrationDetails";
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, FormEvent, SetStateAction } from "react";

type RegistrationFormType = {
  registrationDetails: RegistrationDetails;
  setRegistrationDetails: Dispatch<SetStateAction<RegistrationDetails>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  isPasswordValid: boolean;
  isConfirmPasswordValid: boolean;
  submitting: boolean;
  error: string | null;
  setError: Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const RegistrationForm: React.FC<RegistrationFormType> = ({
  registrationDetails,
  setRegistrationDetails,
  confirmPassword,
  isConfirmPasswordValid,
  setConfirmPassword,
  isPasswordValid,
  submitting,
  error,
  setError,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm" sx={{ marginTop: 3 }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h4" marginBottom={1.5}>
              Register
            </Typography>
            <Stack direction="column" spacing={2}>
              {error ? (
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              ) : (
                ""
              )}
              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={registrationDetails.email}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    email: e.target.value,
                  });
                  setError(null);
                }}
                error={error?.includes("auth/email-already-exists")}
                required
                fullWidth
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                value={registrationDetails.password}
                onChange={(e) => {
                  setRegistrationDetails({
                    ...registrationDetails,
                    password: e.target.value,
                  });
                  setError(null);
                }}
                error={
                  !isPasswordValid || error?.includes("auth/invalid-password")
                }
                helperText={
                  isPasswordValid
                    ? ""
                    : "The password must be a string with at least 6 characters."
                }
                required
                fullWidth
              />
              <TextField
                id="confirm-password"
                label="Confirm Password"
                variant="standard"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!isConfirmPasswordValid}
                helperText={
                  isConfirmPasswordValid
                    ? ""
                    : "Those passwords didn’t match. Try again."
                }
                required
                fullWidth
              />
              <TextField
                id="display-name"
                label="Display Name"
                variant="standard"
                type="text"
                value={registrationDetails.displayName}
                onChange={(e) =>
                  setRegistrationDetails({
                    ...registrationDetails,
                    displayName: e.target.value,
                  })
                }
                required
                fullWidth
              />
              <TextField
                id="sign-up-code"
                label="Sign Up Code (Optional)"
                variant="standard"
                type="text"
                value={registrationDetails.signUpCode}
                onChange={(e) =>
                  setRegistrationDetails({
                    ...registrationDetails,
                    signUpCode: e.target.value,
                  })
                }
                fullWidth
              />
              <Stack direction="row-reverse">
                <Button type="submit" variant="contained" disabled={submitting}>
                  Register
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </form>
  );
};

export default RegistrationForm;
