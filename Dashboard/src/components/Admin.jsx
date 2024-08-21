import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "../state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../modules/Header";
import CustomColumnMenu from "../modules/DataGridCustomColumnMenu";

export default function Admin() {
    const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
    console.log("data", data);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 0.5,
    },
    {
      field: "activityLevel",
      headerName: "ActivityLevel",
      flex: 0.5,
    },
    {
      field: "sex",
      headerName: "Gender",
      flex: 0.5,
    },
    {
      field: "weight",
      headerName: "Weight(kg)",
      flex: 0.5,
    },
    {
      field: "dietaryPreferences",
      headerName: "DietaryPreferences",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.primary.light,
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
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  )
}
