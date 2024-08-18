import React from "react";
import BreakdownChart from "./../modules/BreakdownChart";
import { Box } from "@mui/material";
import Header from "./../modules/Header";

export default function breakdown() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
}
