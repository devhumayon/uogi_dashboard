import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "../utils/baseUrl";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "income",
    "withdraw",
    "profile",
    "settings",
    "service",
    "business",
    "earning",
    "category",
    "subcategory",
  ],
});
