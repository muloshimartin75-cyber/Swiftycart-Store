import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id || product.id}`);
  };

  // Safe rating with default value
  const rating = product.rating || 4.0;
  const reviewCount = product.reviewCount || 0;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="rating-stars">
        <span className="stars">
          {"★".repeat(fullStars)}
          {hasHalfStar && "★"}
          {"☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
        </span>
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="amazon-product-card" onClick={handleProductClick}>
      {/* Product Image Container */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        
        {/* Badges */}
        <div className="product-badges">
          {product.discount && (
            <div className="discount-badge">-{product.discount}%</div>
          )}
          {product.fastDelivery && (
            <div className="delivery-badge">Fast Delivery</div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Brand */}
        {product.brand && (
          <div style={{ fontSize: '0.8rem', color: '#565959', marginBottom: '0.25rem' }}>
            {product.brand}
          </div>
        )}

        {/* Product Title */}
        <h3 className="product-title">{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          {renderStars(rating)}
          <button className="review-count" onClick={(e) => e.stopPropagation()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ({reviewCount})
          </button>
        </div>

        {/* Price Section */}
        <div className="product-price">
          {product.originalPrice ? (
            <>
              <span className="price-current">{formatPrice(product.price)}</span>
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            </>
          ) : (
            <span className="price-current">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Prime Badge */}
        {product.fastDelivery && (
          <div className="product-prime">FREE delivery</div>
        )}

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="amazon-add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;