import React from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  return (
    <div>
      <h1>Search Results</h1>
      <p>You searched for: {query}</p>
      {/* Add logic here to display search results based on the query */}
    </div>
  );
};

export default Search;
