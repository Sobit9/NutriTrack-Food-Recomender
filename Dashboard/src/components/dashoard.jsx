import React, { useState, useEffect } from "react";
import Header from "../modules/Header";
import FlexBetween from "../modules/flexBetween";
import {
  DownloadOutlined,
  Schedule,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../modules/BreakdownChart";
import { useGetDashboardQuery } from "../state/api";
import StatBox from "../modules/StatBox";
import OverviewChart from "../modules/OverviewChart";
import { useUser } from "./Loginpage/authProvider";

export default function dashoard() {
  const [loggedFoods, setLoggedFoods] = useState([]);
  // const navigate = useNavigate();

  // const handleViewDetails = (food) => {
  //   navigate('/foodDetails', { state: { food } });
  // };
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { user } = useUser();
  const { data, isLoading } = useGetDashboardQuery();
  // function toCamelCase(str) {
  //   return str
  //     .toLowerCase() // Convert the entire string to lowercase
  //     .split(' ') // Split the string into words by spaces
  //     .map((word, index) => 
  //       index === 0 // Keep the first word in lowercase
  //         ? word 
  //         : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the first letter of subsequent words
  //     )
  //     .join(''); // Join the words without spaces
  // }
  console.log(data);
  const columns = [
    {
      field: "createdAt",
      headerName: "LoggedAt",
      flex: 1,
    },
    {
      field: "foodName",
      headerName: "Name",
      flex: 0.5,
    },  
    {
      field: "servingWeightGrams",
      headerName: "Weight(gm)",
      flex: 0.5,
    },
    {
      field: "servingQty",
      headerName: "Quantity",
      flex: 0.5,
    },
    {
      field: "calories",
      headerName: "Calories",
      flex: 0.5,
    },
    {
      field: "carbs",
      headerName: "Carbs",
      flex: 0.5,
    },
  ];
  // const { monthlyData } = data;
  // Object.values(monthlyData).reduce(
  //   (acc, { totalCalories}) => {
  //     const curCalories = acc.calories + totalCalories;

  //     return { calories: curCalories};
  //   },
  //   { calories: 0}
  // );
  // if (!data || isLoading) return "Loading...";
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Todays Cal Report"
          value={data && data.todayStats.totalCalories}
          con="+14%"
          description="Since last month"
          icon={
            <Schedule
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yesterday's Cal"
          value={data && data.dailyData[0].totalCalories}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="calories" isDashboard={true} />
        </Box>
        <StatBox
          title="MonthlyData"
          value={data && data.thisMonthStats.totalCalories}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="YearlyData"
          value={data && data.thisMonthStats.totalYearly}
          increase="+43%"
          description="Since last year"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.foodLog) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          {/* <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Meal By Category
          </Typography> */}
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of information via category for this year.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
