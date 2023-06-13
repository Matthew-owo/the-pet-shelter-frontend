import { FormEvent } from "react";
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthError } from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import LoginDetails from "@/types/LoginDetails";

type LoginFormType = {
  loginDetails: LoginDetails;
  setLoginDetails: React.Dispatch<React.SetStateAction<LoginDetails>>;
  loading: boolean;
  error: AuthError | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const loginDetails: React.FC<LoginFormType> = ({
  loginDetails,
  setLoginDetails,
  loading,
  error,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card elevation={3}>
        <CardContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">Login</Typography>
            {error ? (
              <Typography variant="body1" color="error">
                {error?.code}: {error?.message}
              </Typography>
            ) : (
              ""
            )}
            <TextField
              id="email"
              label="Email"
              variant="standard"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, email: e.target.value })
              }
              required
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
              required
              fullWidth
            />
            <Stack direction="row-reverse">
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
                disabled={loading}
              >
                Login
              </LoadingButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default loginDetails;
