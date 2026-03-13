import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 
const Product = ({ product }) => {
  const [imgError, setImgError] = useState(false);
 
  return (
    <div className="group cursor-pointer bg-[#F0EDE6]">
 
      {/* ── Image ── */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden aspect-[3/4] bg-[#E8E2D8]">
 
          {/* Product Image */}
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Fallback — image missing ho to */
            <div className="w-full h-full flex items-center justify-center bg-[#E0D8CC]">
              <span
                className="text-4xl font-light italic text-[#C9A96E]/40"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                AZAMS
              </span>
            </div>
          )}
 
          {/* New Badge */}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-[#C9A96E] text-[#1A1A18] text-[8px] tracking-[2px] uppercase px-2 py-1">
              New
            </span>
          )}
 
          {/* Out of Stock overlay */}
          {product.countInStock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-[9px] tracking-[4px] uppercase border border-white/50 px-4 py-2">
                Sold Out
              </span>
            </div>
          )}
 
          {/* Quick View — hover pe aata hai */}
          {product.countInStock > 0 && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-full py-3 bg-[#1A1A18] text-white text-[9px] tracking-[3px] uppercase hover:bg-[#C9A96E] hover:text-[#1A1A18] transition-colors duration-200">
                Quick View
              </button>
            </div>
          )}
        </div>
      </Link>
 
      {/* ── Info ── */}
      <div className="px-1 pt-3 pb-6">
        {/* Category */}
        <p className="text-[8px] tracking-[3px] uppercase text-[#8C8478] mb-1">
          {product.category || 'Clothing'}
        </p>
 
        {/* Name */}
        <Link to={`/product/${product._id}`}>
          <h3
            className="text-[17px] font-light text-[#1A1A18] leading-snug hover:text-[#C9A96E] transition-colors duration-200"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {product.name}
          </h3>
        </Link>
 
        {/* Price */}
        <p className="mt-1 text-[11px] tracking-wider text-[#C9A96E]">
          Rs. {product.price?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
 
export default Product;