import React from "react";
import { useQuery } from "@tanstack/react-query";

// fetch function
async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function PostsComponent() {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["posts"],
    fetchPosts
  );

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>
        {data.slice(0, 20).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
