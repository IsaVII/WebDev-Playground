import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function RtkQueryDemo() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [refetchCount, setRefetchCount] = useState(0);

  const fetchData = () => {
    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setData({
        id: Date.now(),
        title: "Sample Post",
        author: "Redux Team",
        cached: refetchCount > 0,
      });
      setStatus("success");
      setRefetchCount((c) => c + 1);
    }, 800);
  };

  const invalidate = () => {
    setData(null);
    setStatus("idle");
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        RTK Query is a powerful data-fetching and caching tool built into Redux
        Toolkit. It generates hooks that automatically manage loading states,
        cache data, and provide refetch/invalidation capabilities.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={fetchData}
          disabled={status === "loading"}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "Fetching..." : "Fetch Data"}
        </button>
        {data && (
          <button
            onClick={invalidate}
            className="bg-surface border border-line text-heading px-4 py-2 rounded hover:border-accent transition-colors"
          >
            Invalidate Cache
          </button>
        )}
      </div>

      <div className="bg-surface border border-line rounded p-4 mb-4">
        <div className="text-sm mb-2">
          <span className="text-muted">Status: </span>
          <span
            className={`font-bold ${
              status === "loading"
                ? "text-yellow-400"
                : status === "success"
                  ? "text-green-400"
                  : "text-gray-400"
            }`}
          >
            {status}
          </span>
        </div>
        {data && (
          <>
            <div className="text-sm mb-2">
              <span className="text-muted">Data: </span>
              <span className="text-heading-alt">{data.title}</span>
              {data.cached && (
                <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  from cache
                </span>
              )}
            </div>
            <div className="text-sm">
              <span className="text-muted">Fetched: </span>
              <span className="text-heading-alt">{refetchCount} time(s)</span>
            </div>
          </>
        )}
      </div>

      <CodeBlock>{`// Define an API slice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    addPost: builder.mutation({
      query: (body) => ({ url: 'posts', method: 'POST', body }),
      invalidatesTags: ['Post'], // Auto-refetch getPosts
    }),
  }),
});

// Auto-generated hooks
export const { useGetPostsQuery, useAddPostMutation } = api;

// In component
function Posts() {
  const { data, isLoading, refetch } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  
  return <div>...</div>;
}`}</CodeBlock>
    </div>
  );
}

export default RtkQueryDemo;
