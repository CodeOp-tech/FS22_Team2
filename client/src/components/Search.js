import React, { useState, useContext } from "react";
import ProductContext from "../ProductContext";
import './Search.css'

function Search(props) {
    const [input, setInput] = useState("");

    const { searchCb, searchShopCb } = useContext(ProductContext);

    function handleChange(event) {
        setInput(event.target.value);
        searchCb(event.target.value);
        searchShopCb(event.target.value);
    }

    return (
        <div className="search">
            <form className="searchForm">
                <input className="search-bar"
                type="text"
                placeholder = "type here to search for product..."
                value={input}
                onChange={handleChange}
                />
            </form>

        </div>
    )
}

export default Search;