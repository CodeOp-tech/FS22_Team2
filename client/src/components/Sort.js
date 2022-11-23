import React, { useState, useContext } from "react";
import ProductContext from "../ProductContext";

function Sort(props) {
  const [selectSort, setSelectSort] = useState("");
  const { showTotalPointsCb, showHighToLowPriceCb, showLowToHighPriceCb, showShopsAtoZCb } = useContext(ProductContext);

  // const handleChange = (event) => {
  //   setSelectSort(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.filterCb(input);
  // };

  return (
    // refer to https://www.studytonight.com/bootstrap/solvedbootstrap-dropdown-not-working
    <div className="dropdown my-4">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter by:
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            onClick={showTotalPointsCb}
            className="dropdown-item"
            href="#"
          >
            Total Points (High to Low)
          </a>
        </li>

        <li>
          <a
            onClick={showLowToHighPriceCb}
            className="dropdown-item"
            href="#"
          >
            Price (Low to High)
          </a>
        </li>

        <li>
          <a onClick={showHighToLowPriceCb} 
          className="dropdown-item" 
          href="#">
            Price (High to Low)
          </a>
        </li>

        <li>
          <a
            onClick={showShopsAtoZCb}
            className="dropdown-item"
            href="#"
          >
            Shops (A-Z)
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Sort;