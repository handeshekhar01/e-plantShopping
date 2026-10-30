import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import Navbar from './Navbar';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const itemSubtotal = (item) => item.cost * item.quantity;

  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + itemSubtotal(item), 0);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // quantity would hit 0, so remove it
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleCheckoutShopping = () => alert('Coming Soon');

  const handleContinueShopping = () => onNavigate('plants');

  return (
    <div className="page">
      <Navbar onNavigate={onNavigate} current="cart" />
      <main className="cart-container">
        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add a few plants to get started.</p>
        ) : (
          <>
            <p className="cart-summary">
              Total plants in cart: <strong>{totalQuantity}</strong>
            </p>
            <p className="cart-total">
              Total cart amount: <strong>${calculateTotalAmount()}</strong>
            </p>

            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Unit price: ${item.cost}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name}`}>−</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name}`}>+</button>
                    </div>
                    <p className="cart-item-total">Subtotal: ${itemSubtotal(item)}</p>
                  </div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="cart-actions">
          <button className="continue-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={handleCheckoutShopping}>
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
