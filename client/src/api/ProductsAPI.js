import { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [gte, setGte] = useState("");
  const [lte, setLte] = useState("");
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        `/api/products?limit=${
          page * 9
        }&${sort}&${category}&title[regex]=${search}&gte=${gte || 0}&lte=${
          lte || 999999999999999999
        }`
      );

      setProducts(response.data.products);
      setResult(response.data.result);
    };

    getProducts();
  }, [category, sort, search, page, gte, lte]);

  return {
    products: [products, setProducts],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    gte: [gte, setGte],
    lte: [lte, setLte],
  };
};

export default ProductsAPI;
