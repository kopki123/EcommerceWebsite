import React, { useState } from "react";
import { useGlobalContext } from "../context";
import axios from "axios";

const Categories = () => {
  const value = useGlobalContext();
  const [token] = value.token;
  const [categories] = value.CategoryAPI.categories;

  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const response = await axios.put(
          `/api/category/${id}`,
          { name: category },
          { headers: { authorization: token } }
        );

        alert(response.data.msg);
      } else {
        const response = await axios.post(
          "/api/category",
          { name: category },
          { headers: { authorization: token } }
        );

        alert(response.data.msg);
      }
      setOnEdit(false);
      setCategory("");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`/api/category/${id}`, {
        headers: { authorization: token },
      });
      alert(response.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="categories-page">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Save"}</button>
      </form>

      <div className="col">
        {categories.map((category) => {
          return (
            <div className="row" key={category._id}>
              <h4>{category.name}</h4>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <button onClick={() => deleteCategory(category._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
