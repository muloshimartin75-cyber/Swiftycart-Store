import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getItemPrice = (item) => {
    const product = item.product || item;
    const quantity = item.quantity || 1;
    return (product.price || product.price) * quantity;
  };

  const getItemImage = (item) => {
    const product = item.product || item;
    return product.image;
  };

  const getItemName = (item) => {
    const product = item.product || item;
    return product.name;
  };

  const getItemId = (item) => {
    return item.productId || item.product?._id || item.product?.id || item._id || item.id;
  };

  const subtotal = cart.reduce((sum, item) => sum + getItemPrice(item), 0);
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Cart is Empty</h2>
          <p style={{ color: '#565959', marginBottom: '2rem' }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              backgroundColor: '#FF9900',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <h1 className="cart-title">Shopping Cart</h1>
              <span style={{ color: '#565959', fontSize: '0.9rem' }}>
                Price
              </span>
            </div>
            
            {cart.map((item) => {
              const itemId = getItemId(item);
              const quantity = item.quantity || 1;
              
              return (
                <div key={itemId} className="cart-item">
                  <img 
                    src={getItemImage(item)} 
                    alt={getItemName(item)} 
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-info">
                    <Link to={`/product/${itemId}`} className="cart-item-title">
                      {getItemName(item)}
                    </Link>
                    <div className="cart-item-stock">In Stock</div>
                    
                    <div className="cart-item-actions">
                      <select 
                        className="quantity-select"
                        value={quantity}
                        onChange={(e) => updateQuantity(itemId, parseInt(e.target.value))}
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>Qty: {num}</option>
                        ))}
                      </select>
                      
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeFromCart(itemId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-item-price">
                    {formatPrice(getItemPrice(item))}
                  </div>
                </div>
              );
            })}
            
            <div style={{ 
              textAlign: 'right', 
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #D5D9D9'
            }}>
              <span style={{ fontSize: '1.1rem' }}>
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}): 
              </span>
              <strong style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>
                {formatPrice(subtotal)}
              </strong>
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="cart-subtotal">
              <div className="cart-subtotal-label">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
              </div>
              <div className="cart-subtotal-price">
                {formatPrice(subtotal)}
              </div>
            </div>
            
            <button 
              className="checkout-button"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;