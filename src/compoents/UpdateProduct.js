import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UpdateProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await fetch("http://127.0.0.1:8000/api/product/" + id);
    result = await result.json();
    setProduct(result);
  };

  const path = product.file_path + "";
  const modifiedFilePath = path.replace("public/", "");

  const updateProduct = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: nameRef.current.value,
      file: fileRef.current.files[0],
      price: priceRef.current.value,
      description: descriptionRef.current.value,
    };

    const formData = new FormData();
    formData.append("file", updatedProduct.file);
    formData.append("price", updatedProduct.price);
    formData.append("description", updatedProduct.description);
    formData.append("name", updatedProduct.name);

    try {
      const result = await fetch(`http://127.0.0.1:8000/api/updateProduct/${id}`, {
        method: "POST",
        body: formData,
      });

      if (result.ok) {
        navigate("/");
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
    alert("Data has been updated successfully");
  };

  return (
    <div>
      <Header />
      <h1>UpdateProduct</h1>
      {product && (
        <form className="col-sm-6 offset-sm-3" onSubmit={updateProduct}>
          <TextField 
            label="Name"
            value={product.name}
            inputRef={nameRef}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
       
          <input
            type="file"
            className="form-control mt-2"
            ref={fileRef}
            placeholder="File"
            required
          />
          <TextField id="outlined-helperText"
            label="Price"
            value={product.price}
            inputRef={priceRef}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField id="outlined-helperText"
            label="Description"
            value={product.description}
            inputRef={descriptionRef}
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <div className="mt-2">
            <img
              style={{ width: 100 }}
              src={`http://127.0.0.1:8000/storage/${modifiedFilePath}`}
              alt="Product"
            />
          </div>

          <Button type="submit" variant="contained" color="primary" className="mt-3">
            Update Product
          </Button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
