"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";
import RegistrationForm from "@/components/forms/RegistrationForm";
import RegistrationDetails from "@/types/RegistrationDetails";

const Register = () => {
  const [registrationDetails, setRegistrationDetails] =
    useState<RegistrationDetails>({
      email: "",
      password: "",
      displayName: "",
      signUpCode: "",
    });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:10888/api/v1/users/create`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(registrationDetails),
        }
      );

      if (response.ok) {
        router.push("/");
      } else {
        const res = await response.json();
        setError(res.message);
      }
    } catch (error: unknown) {
      setError((error as any).message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setIsPasswordValid(
      registrationDetails.password.length >= 6 ||
        registrationDetails.password === ""
    );
    setIsConfirmPasswordValid(registrationDetails.password === confirmPassword);
  }, [registrationDetails.password, confirmPassword]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 3 }}>
      <RegistrationForm
        registrationDetails={registrationDetails}
        setRegistrationDetails={setRegistrationDetails}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isPasswordValid={isPasswordValid}
        isConfirmPasswordValid={isConfirmPasswordValid}
        submitting={submitting}
        error={error}
        setError={setError}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Register;
