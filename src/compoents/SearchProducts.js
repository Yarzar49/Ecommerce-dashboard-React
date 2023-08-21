import React, { useState, useRef } from "react";
import Header from "./Header";


const SearchProducts = () => {
  const searchRef = useRef();
  const [dataSearch, setDataSearch] = useState();

  const search = async (e) => {
    e.preventDefault();

    let result = await fetch("http://127.0.0.1:8000/api/search/" + searchRef.current.value)
    result = await result.json();
    setDataSearch(result);   
   
  }
 


  return (
    <>
    
      <div className="col-sm-6 offset-sm-3">
        <form onSubmit={search}>
          <input
            ref={searchRef}
            type="text"
            className="form-control mt-3"
            placeholder="Search Products"
          />
        </form>
      </div>
    </>
  );
};


export default SearchProducts;
