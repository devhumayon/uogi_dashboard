import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    allCategory: builder.query({
      query: () => ({
        url: "/category?limit=100",
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // Get single category by ID
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // Add new category
    addCategory: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/category/create-category",
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["category"],
    }),

   

    // Edit category
    editCategory: builder.mutation({
      query: ({ id, data }) => {
        console.log(id, data);
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/category/${id}`,
          method: "patch",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["category"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/category/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["category"],
    }),

    // Get all subcategories for a category
    getSubcategories: builder.query({
      query: (categoryId) => ({
        url: `/sub-category?categoryId=${categoryId}&sort=subCategoryname`,
        method: "GET",
      }),
      providesTags: ["subcategory"],
    }),

    // Get single subcategory by ID
    getSubcategoryById: builder.query({
      query: (subcategoryId) => ({
        url: `/sub-category/${subcategoryId}`,
        method: "GET",
      }),
      providesTags: ["subcategory"],
    }),

    // Add new subcategory
    addSubcategory: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/sub-category/create-sub-category",
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["subcategory"],
    }),

     // move  sub category
    moveSubCategory: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/sub-category/move",
          method: "POST",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["category"],
    }),

    // Edit subcategory
    editSubcategory: builder.mutation({
      query: ({ subcategoryId, data }) => {
        console.log("edit sub", subcategoryId);
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/sub-category/${subcategoryId}`,
          method: "patch",
          body: data,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["category"],
    }),

    // Delete subcategory
    deleteSubcategory: builder.mutation({
      query: ({ subcategoryId }) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: `/sub-category/${subcategoryId}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["subcategory"],
    }),
  }),
});

export const {
  // Category hooks
  useAllCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  // Subcategory hooks
  useGetSubcategoriesQuery,
  useGetSubcategoryByIdQuery,
  useAddSubcategoryMutation,
  useEditSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useMoveSubCategoryMutation
} = categoryApi;
