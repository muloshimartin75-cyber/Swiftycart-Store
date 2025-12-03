import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { productsAPI } from "../utils/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getById(id);
        setProduct(response.product);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="product-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>{error || "The product you're looking for doesn't exist."}</p>
        <button onClick={() => navigate("/")}>Back to Shopping</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-nav">
        <span className="breadcrumb-link" onClick={() => navigate("/")}>Home</span>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-link" onClick={() => navigate("/")}>{product.category}</span>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-details-layout">
        {/* Product Images */}
        <div className="product-images-section">
          <div className="product-main-image">
            <img src={product.image} alt={product.name} className="product-details-image" />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-details-info">
          <h1 className="product-details-title">{product.name}</h1>
          
          {product.brand && (
            <div className="product-brand-name" style={{ color: '#007185', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Brand: {product.brand}
            </div>
          )}
          
          <div className="product-details-rating">
            <span className="rating-stars" style={{ color: '#FFA41C' }}>
              {"★".repeat(Math.floor(product.rating || 0))}
              {"☆".repeat(5 - Math.floor(product.rating || 0))}
            </span>
            <a href="#" className="review-count-link" onClick={(e) => e.preventDefault()}>
              {product.reviewCount || 0} ratings
            </a>
          </div>

          <div className="product-details-price">
            {product.originalPrice ? (
              <>
                <span className="price-current">{formatPrice(product.price)}</span>
                <span className="price-original-small">{formatPrice(product.originalPrice)}</span>
                {product.discount && (
                  <span className="price-savings">Save {product.discount}%</span>
                )}
              </>
            ) : (
              <span className="price-current">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="product-shipping-info">
            {product.fastDelivery && (
              <div style={{ color: '#007600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                ✓ {product.shipping || 'FREE delivery'}
              </div>
            )}
            {product.seller && (
              <div style={{ fontSize: '0.85rem', color: '#565959' }}>
                Sold by: <span style={{ color: '#007185', cursor: 'pointer' }}>{product.seller}</span>
              </div>
            )}
          </div>

          <div className="product-description-short">
            <p>{product.description}</p>
          </div>

          {/* Add to Cart Section */}
          <div className="product-details-actions">
            <div className="quantity-selector-details">
              <label style={{ fontSize: '0.9rem', marginRight: '0.5rem' }}>Quantity:</label>
              <select 
                className="quantity-select"
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button 
              className="add-to-cart-details-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            
            <button 
              className="buy-now-button"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </button>
          </div>

          {/* Guarantee */}
          <div className="product-guarantee">
            <div className="guarantee-item">✓ FREE delivery</div>
            <div className="guarantee-item">✓ 30-day returns</div>
            <div className="guarantee-item">✓ 1-year warranty</div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs-section">
        <div className="product-tabs-nav">
          <button 
            className={`product-tab ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`product-tab ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`product-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewCount || 0})
          </button>
          <button 
            className={`product-tab ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping & Returns
          </button>
        </div>
        
        <div className="product-tab-content">
          {activeTab === 'description' && (
            <div>
              <h3>About this item</h3>
              <p>{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <>
                  <h4>Key Features:</h4>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3>Product Specifications</h3>
              {product.specifications ? (
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="spec-key-cell">{key}</td>
                        <td className="spec-value-cell">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No specifications available.</p>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="average-rating">
                  <span className="rating-large">{product.rating?.toFixed(1) || '0.0'}</span>
                  <span className="rating-stars" style={{ color: '#FFA41C' }}>
                    {"★".repeat(Math.floor(product.rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.rating || 0))}
                  </span>
                </div>
                <p>{product.reviewCount || 0} customer reviews</p>
              </div>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div>
              <h3>Shipping & Returns</h3>
              <div className="shipping-details">
                <p><strong>Shipping:</strong> {product.shipping || 'FREE delivery'}</p>
                <p><strong>Returns:</strong> 30-day return policy. Items must be in original condition.</p>
                <p><strong>Warranty:</strong> 1-year manufacturer warranty included.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;