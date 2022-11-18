import React from "react";

// just the pipeline for all things related to the Product context
const ProductContext = React.createContext();

export default ProductContext;

// just the pipeline, does not include the storage (which will be in App/Lowest Common Ancestor)