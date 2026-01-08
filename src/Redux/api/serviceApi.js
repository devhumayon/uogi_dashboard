import { baseApi } from "../baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allServices: builder.query({
      query: () => ({
        url: "/service/service-by-admin",
        method: "GET",
      }),
      providesTags: ["service"],
    }),
  }),
});

export const { useAllServicesQuery } = serviceApi;
