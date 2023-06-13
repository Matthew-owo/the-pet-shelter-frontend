"use client";
import { Button } from "@mui/material";
import NextLink from "next/link";

type NavigationItemType = {
  key: string;
  name: string;
  href: string;
};

const NavigationItem: React.FC<NavigationItemType> = ({ key, name, href }) => {
  return (
    <Button
      key={key}
      href={href}
      component={NextLink}
      sx={{ my: 2, color: "white", display: "block" }}
    >
      {name}
    </Button>
  );
};

export default NavigationItem;
