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
import { useGetFoodsQuery } from "../state/api.jsx";

const Food = ({
  weight,
  name,
  calories,
  protein,
  carbs,
  fats,
  vitamins,
  minerals,
  category,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Calorie Content {Number(calories).toFixed(2)}gm
        </Typography>
        <Typography>weight: {weight} gm</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Protein: {protein} gm</Typography>
          <Typography>carbs: {carbs} gm</Typography>
          <Typography>Fats: {fats} gm</Typography>
          <Typography>Vitamins: {vitamins}</Typography>
          <Typography>Minerals: {minerals}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default function food() {
  const { data, isLoading } = useGetFoodsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  console.log("data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="FOOD" subtitle="Search for food here." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data &&
            data.map(
              ({
                _id,
                weight,
                name,
                calories,
                protein,
                carbs,
                fats,
                vitamins,
                minerals,
                category,
              }) => (
                <Food
                  key={_id}
                  _id={_id}
                  name={name}
                  weight={weight}
                  calories={calories}
                  protein={protein}
                  carbs={carbs}
                  fats={fats}
                  vitamins={vitamins}
                  minerals={minerals}
                  category={category}
                />
              )
            )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}
