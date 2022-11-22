import React, { useState, useContext } from "react";
import ProductContext from "../ProductContext";

function SearchMaps(props) {
  const [input, setInput] = useState("");

  const { searchMapCb, searchShopCb } = useContext(ProductContext);

  function handleChange(event) {
    setInput(event.target.value);
    searchMapCb(event.target.value);
    // searchShopCb(event.target.value);
  }

  return (
    <div className="search">
      <form>
        <input
          type="text"
          placeholder="type here to search..."
          value={input}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default SearchMaps;
