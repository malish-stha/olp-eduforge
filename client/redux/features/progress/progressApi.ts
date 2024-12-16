// // progressApi.js (Redux API slice)

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const progressApi = createApi({
//   reducerPath: "progressApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api/progress" }),
//   endpoints: (builder) => ({
//     // Endpoint to add/update progress
//     updateProgress: builder.mutation({
//       query: ({ courseId, videoId }) => ({
//         url: `/update/${courseId}/${videoId}`,
//         method: "POST",
//       }),
//     }),

//     // Endpoint to fetch progress
//     getProgress: builder.query({
//       query: (courseId) => `/progress/${courseId}`,
//     }),
//   }),
// });

// export const { useUpdateProgressMutation, useGetProgressQuery } = progressApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/progress" }),
  endpoints: (builder) => ({
    // Endpoint to add/update progress
    updateProgress: builder.mutation({
      query: ({ courseId, videoId }) => ({
        url: `/${courseId}/${videoId}`,
        method: "POST",
      }),
    }),

    // Endpoint to fetch progress
    getProgress: builder.query({
      query: (courseId) => `/${courseId}`,
    }),
  }),
});

export const { useUpdateProgressMutation, useGetProgressQuery } = progressApi;
