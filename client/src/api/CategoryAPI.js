import { useState, useEffect } from "react";
import axios from "axios";

const CategoryAPI = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    };

    getCategories();
  }, []);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default CategoryAPI;
