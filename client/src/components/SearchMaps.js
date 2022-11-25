import React, { useState, useEffect, useContext } from "react";
//import ProductContext from "../ProductContext";
import Api from "../helpers/Api";

function SearchMaps(props) {
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getSelectedShopsCb(input.split(" ").join(","));
  };

  return (
    <div className="searchMap">
      <form onSubmit={handleSubmit}>
        <input
          style={{width:'608px', borderRadius:'5px'}}
          type="text"
          placeholder="Search for a product..."
          value={input}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default SearchMaps;
