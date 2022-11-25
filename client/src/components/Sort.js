import React, { useContext } from "react";
import ProductContext from "../ProductContext";

function Sort(props) {
  const { showTotalPointsCb, showHighToLowPriceCb, showLowToHighPriceCb, showShopsAtoZCb } = useContext(ProductContext);

  return (
    // refer to https://www.studytonight.com/bootstrap/solvedbootstrap-dropdown-not-working
    <div className="dropdown my-4" style={{marginLeft:'800px'}}>
      <button
        style={{backgroundColor:'rgba(101, 212, 172, 0.884)', width:'210px', border:'none'}}
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