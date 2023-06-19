"use client";
import CatDataGrid from "@/components/CatDataGrid";
import CreateCatForm from "@/components/forms/CreateCatForm";
import { initFirebase } from "@/firebase/app";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<string>("1");

  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const verify = async () => {
    if (user) {
      const role = (await user.getIdTokenResult()).claims.role;
      if (role !== "employee") router.push("/");
      return;
    } else if (!user && !loading) {
      router.push("/");
    }
  };

  useEffect(() => {
    verify();
  }, [user, loading]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {loading ? (
        "Loading..."
      ) : (
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="Tabs">
              <Tab label="Cat List" value="1" />
              <Tab label="Add New Cat" value="2" />
              <Tab label="..." value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><CatDataGrid /></TabPanel>
          <TabPanel value="2">
            <CreateCatForm />
          </TabPanel>
          <TabPanel value="3">...</TabPanel>
        </TabContext>
      )}
    </Box>
  );
};

export default Dashboard;
