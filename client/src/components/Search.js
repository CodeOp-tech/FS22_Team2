import React, { useState, useContext } from "react";
import ProductContext from "../ProductContext";

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
            <form>
                <input 
                type="text"
                placeholder = "type here to search..."
                value={input}
                onChange={handleChange}
                />
            </form>

        </div>
    )
}

export default Search;