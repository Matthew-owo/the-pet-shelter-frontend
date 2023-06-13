"use client";
import { Typography } from "@mui/material";
import NextLink from "next/link";

const CompanyLogo = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      component={NextLink}
      href="/"
      sx={{
        mr: 2,
        display: "flex",
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      The Pet Shelter
    </Typography>
  );
};

export default CompanyLogo;
