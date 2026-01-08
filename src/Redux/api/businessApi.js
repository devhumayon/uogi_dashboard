import { baseApi } from "../baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBusiness: builder.query({
      query: () => ({
        url: "/business",
        method: "GET",
      }),
      providesTags: ["business"],
    }),
  }),
});

export const { useAllBusinessQuery } = businessApi;
