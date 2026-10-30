import { useSelector } from 'react-redux';

function Navbar({ onNavigate, current }) {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <button className="nav-brand" onClick={() => onNavigate('landing')}>
        Paradise Nursery
      </button>
      <div className="nav-links">
        <button onClick={() => onNavigate('landing')}>Home</button>
        <button
          className={current === 'plants' ? 'active' : ''}
          onClick={() => onNavigate('plants')}
        >
          Plants
        </button>
        <button
          className={`cart-link ${current === 'cart' ? 'active' : ''}`}
          onClick={() => onNavigate('cart')}
          aria-label={`Cart, ${totalItems} items`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.7 11.6a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
          </svg>
          <span className="cart-count">{totalItems}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
