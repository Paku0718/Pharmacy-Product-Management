import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Default image if product doesn't have one
  const defaultImage = "https://via.placeholder.com/300x200/e2f8f6/107e78?text=SunPharma";
  
  // Function to truncate description to keep cards consistent
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      {/* Product Image Section */}
     
      
      {/* Content Section */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-1">
          <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
            {product.category || "General"}
          </span>
        </div>
        
        <h2 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
          {product.productName}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {truncateText(product.productDescription)}
        </p>
        
        {/* Price and Details Section */}
        <div className="mt-auto">
          <Link
            to={`/products/${product.productId}`}
            className="block w-full bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-600 hover:to-emerald-500 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;