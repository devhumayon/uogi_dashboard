import { baseApi } from "../baseApi";

// const accessToken = localStorage.getItem("accessToken");
// console.log(accessToken);

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getSettings: builder.query({
      query: () => ({
        url: "/setting",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    addSettings: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        // console.log("add Settings data", data);
        // console.log("add settings token", accessToken);

        return {
          url: "/setting",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          invalidatesTags: ["settings"],
        };
      },
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "PATCH",
        body: data,
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
        invalidatesTags: ["settings"],
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = settingsApi;
