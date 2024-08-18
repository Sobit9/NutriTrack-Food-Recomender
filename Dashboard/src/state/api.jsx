import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://LOCALHOST:3000" }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Foods",
    "Clients",
    "Admins",
    "Performance",
    "FoodLog",
    "Nutritions",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getFoods: build.query({
      query: () => "client/foods",
      providesTags: ["Foods"],
    }),
    getClients: build.query({
      query: () => "client/clients",
      providesTags: ["Clients"],
    }),
    getFoodLogs: build.query({
      query: (page, pageSize, sort, search) => ({
        url: "client/foodLog",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["FoodLog"],
    }),
    getNutritions: build.query({
      query: () => "nutrition/nutritions",
      providesTags: ["Nutritions"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetFoodsQuery,
  useGetClientsQuery,
  useGetFoodLogsQuery,
  useGetNutritionsQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
