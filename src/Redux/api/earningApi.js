import { baseApi } from "../baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    earnings: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/payment?status=paid",
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useEarningsQuery } = earningApi;
