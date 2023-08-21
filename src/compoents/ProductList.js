import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of items to display per page

  const searchRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const search = async (e) => {
    e.preventDefault();

    const searchKey = searchRef.current.value;

    if (searchKey !== "") {
      const response = await fetch("http://127.0.0.1:8000/api/search/" + searchKey);
      const result = await response.json();
      setDataSearch(result);
      setCurrentPage(1); // Reset page number when new search is performed
    } else {
      setDataSearch([]);
      setCurrentPage(1); // Reset page number when clearing search
    }
  };

  const deleteAction = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchData(); // Refetch data after successful deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/list");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Calculate the indices for the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataSearch.length > 0 ? dataSearch.slice(indexOfFirstItem, indexOfLastItem) : data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const nextPage = () => {
    const totalItems = dataSearch.length > 0 ? dataSearch.length : data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Header />
      {dataSearch.length > 0 ? <h1>Search List</h1> : <h1>Product List</h1>}

      <div className="col-sm-6 offset-sm-3">
        <form onSubmit={search}>
          <input
            ref={searchRef}
            type="text"
            className="form-control mt-3"
            placeholder="Search Products"
          />
          {/* <button type="submit" className="btn btn-primary mt-2">
            Search
          </button> */}
        </form>
      </div>

      <div className="col-sm-8 offset-sm-2 mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{ width: 100 }}
                    src={"http://127.0.0.1:8000/storage/" + item.file_path.replace("public/", "")}
                    alt={item.name}
                  />
                </td>
                <td>
                  <button
                    onClick={() => deleteAction(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <Link to={"update/" + item.id}>
                    <button className="btn btn-sm btn-primary ms-2">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button onClick={prevPage} className="page-link">
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil((dataSearch.length > 0 ? dataSearch.length : data.length) / itemsPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil((dataSearch.length > 0 ? dataSearch.length : data.length) / itemsPerPage) ? "disabled" : ""}`}>
              <button onClick={nextPage} className="page-link">
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
