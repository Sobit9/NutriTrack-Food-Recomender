import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../modules/Header.jsx";
import { useGetFoodLogsQuery } from "../state/api.jsx";

export default function foodLog() {
  const { data, isLoading } = useGetFoodLogsQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="FOODLOGS" subtitle="Check & log you meal hear." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
        >
          {data &&
            data.map(({ _id, userId, mealId, foodItems, category }) => (
              <Food
                key={_id}
                _id={_id}
                userId={userId}
                mealId={mealId}
                foodItems={foodItems}
                category={category}
              />
            ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}
