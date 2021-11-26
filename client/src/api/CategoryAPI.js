import { useState, useEffect } from "react";
import axios from "axios";

const CategoryAPI = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    };

    getCategories();
  }, []);

  return {
    categories: [categories, setCategories],
  };
};

export default CategoryAPI;
