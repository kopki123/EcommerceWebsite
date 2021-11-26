import React from "react";
import { useGlobalContext } from "../context";
import "./SearchBar.css";

const SearchBar = () => {
  const value = useGlobalContext();
  const [sort, setSort] = value.ProductsAPI.sort;
  const [search, setSearch] = value.ProductsAPI.search;
  const [gte, setGte] = value.ProductsAPI.gte;
  const [lte, setLte] = value.ProductsAPI.lte;

  return (
    <div className="search_bar">
      <div className="row">
        <i className="fas fa-search"></i>
        <input
          type="text"
          value={search}
          placeholder=""
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row pricerange">
        <i className="fas fa-dollar-sign"></i>
        <input
          type="number"
          name="min"
          placeholder="最小值"
          onChange={(e) => setGte(e.target.value)}
        />
        <input
          type="number"
          name="max"
          placeholder="最大值"
          onChange={(e) => setLte(e.target.value)}
        />
      </div>
      <div className="row">
        <span>排序 : </span>
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">最新</option>
          <option value="sort=createdAt">最舊</option>
          <option value="sort=-sold">熱銷</option>
          <option value="sort=-price">價格: 高-低</option>
          <option value="sort=price">價格: 低-高</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
