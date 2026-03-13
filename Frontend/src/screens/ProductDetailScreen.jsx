import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('The product did not load. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ── Loading ──
  if (loading) return (
    <div className="bg-[#F7F4EF] min-h-screen flex items-center justify-center">
      <p className="text-[9px] tracking-[5px] uppercase text-[#C9A96E] animate-pulse">Loading...</p>
    </div>
  );

  // ── Error ──
  if (error) return (
    <div className="bg-[#F7F4EF] min-h-screen flex flex-col items-center justify-center gap-6">
      <p className="text-[9px] tracking-[4px] uppercase text-[#8C8478]">{error}</p>
      <button
        onClick={() => navigate('/')}
        className="text-[9px] tracking-[3px] uppercase text-[#C9A96E] border-b border-[#C9A96E] pb-1"
      >
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div className="bg-[#F7F4EF] min-h-screen" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Josefin+Sans:wght@200;300;400&display=swap" rel="stylesheet" />

      <div className="container mx-auto px-6 lg:px-20 py-12">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-[8px] tracking-[3px] uppercase text-[#8C8478] mb-10">
          <Link to="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#C9A96E] transition-colors">New Arrivals</Link>
          <span>/</span>
          <span className="text-[#1A1A18]">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-14">

          {/* ── Left: Image ── */}
          <div className="md:w-1/2">
            <div className="bg-[#E8E2D8] overflow-hidden aspect-[3/4] relative">
              {!imgError ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-6xl font-light italic text-[#C9A96E]/30"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    AZAMS
                  </span>
                </div>
              )}

              {/* Out of stock overlay */}
              {product.countInStock === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-[9px] tracking-[4px] uppercase border border-white/50 px-6 py-3">
                    Sold Out
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="md:w-1/2 flex flex-col">

            {/* Category & Code */}
            <p className="text-[8px] tracking-[4px] uppercase text-[#C9A96E] mb-3">
              {product.category || 'Clothing'}
            </p>

            {/* Name */}
            <h1
              className="text-4xl md:text-5xl font-light leading-tight text-[#1A1A18] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.name}
            </h1>

            <p className="text-[8px] tracking-[3px] uppercase text-[#8C8478] mb-6">
              Product Code: AZ-{product._id?.slice(-6)?.toUpperCase()}
            </p>

            {/* Price */}
            <p
              className="text-3xl font-light text-[#1A1A18] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Rs. {product.price?.toLocaleString()}
            </p>

            {/* ── Size Selector ── */}
            <div className="border-t border-[#E2DDD5] py-7 mb-7">
              <h3 className="text-[8px] tracking-[4px] uppercase text-[#8C8478] mb-4">
                Select Size
              </h3>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 text-[9px] tracking-wider border transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-[#1A1A18] bg-[#1A1A18] text-white'
                        : 'border-[#E2DDD5] text-[#8C8478] hover:border-[#C9A96E] hover:text-[#C9A96E]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Buttons ── */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`w-full py-4 text-[9px] tracking-[3px] uppercase transition-all duration-300 ${
                  product.countInStock === 0
                    ? 'bg-[#E2DDD5] text-[#8C8478] cursor-not-allowed'
                    : added
                    ? 'bg-[#C9A96E] text-[#1A1A18]'
                    : 'bg-[#1A1A18] text-white hover:bg-[#C9A96E] hover:text-[#1A1A18]'
                }`}
              >
                {product.countInStock === 0
                  ? 'Sold Out'
                  : added
                  ? '✦ Added to Bag'
                  : 'Add to Bag'}
              </button>

              <button
                onClick={() => { handleAddToCart(); navigate('/cart'); }}
                disabled={product.countInStock === 0}
                className="w-full border border-[#E2DDD5] py-4 text-[9px] tracking-[3px] uppercase text-[#8C8478] hover:border-[#1A1A18] hover:text-[#1A1A18] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* ── Description ── */}
            <div className="mt-10 space-y-7 border-t border-[#E2DDD5] pt-8">
              <div>
                <h4 className="text-[8px] tracking-[4px] uppercase text-[#1A1A18] mb-3">Description</h4>
                <p className="text-[11px] tracking-[1px] text-[#8C8478] leading-loose font-light">
                  {product.description || 'Premium quality clothing crafted for comfort and style.'}
                </p>
              </div>

              <div>
                <h4 className="text-[8px] tracking-[4px] uppercase text-[#1A1A18] mb-3">Composition & Care</h4>
                <ul className="text-[10px] tracking-wider text-[#8C8478] space-y-2 font-light">
                  <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✦</span> 98% Cotton, 2% Elastane</li>
                  <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✦</span> Machine wash at 30°C</li>
                  <li className="flex items-center gap-2"><span className="text-[#C9A96E]">✦</span> Do not bleach</li>
                </ul>
              </div>

              {/* Stock info */}
              {product.countInStock > 0 && product.countInStock <= 5 && (
                <p className="text-[9px] tracking-[2px] uppercase text-red-400">
                  ⚠ Sirf {product.countInStock} pieces bachi hain!
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;