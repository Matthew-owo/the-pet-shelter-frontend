"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { initFirebase } from "@/firebase/app";
import { getAuth } from "firebase/auth";
import {
  useAuthState,
  useIdToken,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import UserAvatarWithMenu from "./UserAvatarWithUserMenu";
import LoginRegisterButton from "./LoginRegisterButton";
import CompanyLogo from "./CompanyLogo";
import NavigationItem from "./NavigationItem";

const Navbar = () => {
  const router = useRouter();

  initFirebase();
  const auth = getAuth();
  const [user, loadingCheckAuthExist] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }} component="header">
      <AppBar position="static" component="div">
        <Toolbar>
          {/* Company Logo / Name */}
          <CompanyLogo />
          {/* Menu Item */}
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {/* <NavigationItem key="item1" name="Item 1" href="/" />
            <NavigationItem key="item2" name="Item 2" href="/" />
            <NavigationItem key="item3" name="Item 3" href="/" /> */}
          </Box>
          {/* User Avatar with Menu / Login & Register */}
          <Box sx={{ flexGrow: 0 }}>
            {loadingCheckAuthExist ? (
              // If checking is user's data exist
              <CircularProgress color="secondary" />
            ) : user ? (
              // If user's data exist
              <UserAvatarWithMenu user={user} />
            ) : (
              // If user's data not exist
              <LoginRegisterButton />
            )}
          </Box>
          {/* End */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
