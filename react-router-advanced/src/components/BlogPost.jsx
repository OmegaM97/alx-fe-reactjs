import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return <div>Blog Post Page — ID: {id}</div>;
}
