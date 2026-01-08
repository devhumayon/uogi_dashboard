import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
      invalidatesTags: ["user"],
    }),

    // Forget password
    ForgetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("accessToken");
        console.log("Forget Pass Mail Token", token);
        return {
          url: "/auth/forgot-password-otp",
          method: "POST",
          body: data,
          headers: {
            "content-type": "application/json",
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Verify Otp
    VerifyOtp: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log("vetifyOtpToken", token);
        return {
          url: "/auth/forgot-password-otp-match",
          method: "PATCH",
          body: data,
          headers: {
            "content-type": "application/json",
            token: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Resend Otp
    ResendOtp: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("otpToken");
        console.log("Resend OTP Token", token);
        return {
          url: "/otp/resend-otp",
          method: "PATCH",
          body: data,
          headers: {
            // "content-type": "application/json",
            token: token,
          },
        };
      },
    }),

    // Reset Password
    ResetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("verifiedOtpToken");
        console.log({ token });
        return {
          url: "/auth/forgot-password-reset",
          method: "PATCH",
          body: data,
          headers: {
            // "content-type": "application/json",
            token: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),

    // Update Profile
    // updateProfile: builder.mutation({
    //   query: ({ id, data }) => {
    //     const accessToken = localStorage.getItem("accessToken"); // Retrieve token dynamically
    //     return {
    //       url: `/users/${id}`,
    //       method: "PUT",
    //       body: data,
    //       headers: {
    //         "content-type": "multipart/form-data",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),

    // Change Password
    // ChangePassword: builder.mutation({
    //   query: (data) => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     return {
    //       url: `/users/change-password`,
    //       method: "PATCH",
    //       body: data,
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),

    // profile: builder.query({
    //   query: () => ({
    //     url: "/users/profile",
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),

    // getAllUser: builder.query({
    //   query: () => ({
    //     url: "/users",
    //     method: "GET",
    //     // headers: {
    //     //   "content-type": "application/json",
    //     //   Authorization: `${accessToken}`,
    //     // },
    //   }),
    //   providesTags: ["user"],
    // }),

    // getAllWorker: builder.query({
    //   query: () => ({
    //     url: "/users?role=worker",
    //     method: "GET",
    //     // headers: {
    //     //   "content-type": "application/json",
    //     //   Authorization: `${accessToken}`,
    //     // },
    //   }),
    //   providesTags: ["user"],
    // }),

    // getAllProvider: builder.query({
    //   query: () => ({
    //     url: "/users?role=provider",
    //     method: "GET",
    //     // headers: {
    //     //   "content-type": "application/json",
    //     //   Authorization: `${accessToken}`,
    //     // },
    //   }),
    //   providesTags: ["user"],
    // }),

    // SingleUser: builder.query({
    //   query: (id) => ({
    //     url: `/users/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),

    // updatePassWord: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/update-password",
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["user"],
    // }),

    // // Create Admin
    // createAdmin: builder.mutation({
    //   query: (data) => {
    //     const accessToken = localStorage.getItem("accessToken"); // Retrieve token dynamically
    //     return {
    //       url: "/users/create-admin",
    //       method: "POST",
    //       body: data,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`, // Use Bearer token authentication
    //       },
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),

    // Create Admin
    // blockedUser: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/users/block/${id}`,
    //       method: "PATCH",
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),
  }),
});

export const {
  useSignInMutation,
  useForgetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  //   useProfileQuery,
  //   useGetAllUserQuery,
  //   useUpdatePassWordMutation,
  //   useUpdateProfileMutation,
  //   useSingleUserQuery,
  //   useChangePasswordMutation,
  //   useGetAllProviderQuery,
  //   useGetAllWorkerQuery,
  //   useCreateAdminMutation,
  //   useBlockedUserMutation,
} = authApi;
