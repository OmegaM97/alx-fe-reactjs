import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return <div>Dynamic Post Page — Post ID: {id}</div>;
}
