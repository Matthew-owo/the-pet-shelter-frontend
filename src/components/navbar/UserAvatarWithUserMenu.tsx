"use client";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initFirebase } from "@/firebase/app";
import { User, getAuth } from "firebase/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NextLink from "next/link";

type UserAvatarWithMenuType = {
  user: User;
};

const UserAvatarWithMenu: React.FC<UserAvatarWithMenuType> = ({ user }) => {
  const router = useRouter();

  initFirebase();
  const auth = getAuth();
  const [signOut, signOutLoading, error] = useSignOut(auth);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [role, setRole] = useState<string>("user");

  const getRole = async () => {
    const userRole = (await user.getIdTokenResult()).claims.role as string;
    setRole(userRole);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickProfile = () => {
    router.push("/profile");
    closeUserMenu();
  };

  const handleSignOut = () => {
    signOut();
    closeUserMenu();
  };

  useEffect(() => {
    if (user) getRole();
  }, [user]);

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={handleOpenUserMenu}
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={closeUserMenu}
      >
        <MenuItem key="Profile" onClick={handleClickProfile}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        {role === "employee" ? (
          <MenuItem key="Dashboard" component={NextLink} href="/dashboard">
            <Typography textAlign="center">Dashboard</Typography>
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem key="SignOut" onClick={handleSignOut}>
          <Typography
            textAlign="center"
            color="error"
            fontWeight="bold"
            marginRight={1.3}
          >
            Logout
          </Typography>
          <LogoutIcon color="error" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarWithMenu;
