import React from "react";
import { useGlobalContext } from "../context";

const LoadMore = () => {
  const value = useGlobalContext();
  const [page, setPage] = value.ProductsAPI.page;
  const [result] = value.ProductsAPI.result;

  return (
    <div className="load_more">
      {result < page * 9 ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
};

export default LoadMore;
