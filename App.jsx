import { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // "landing" | "plants" | "cart"
  const [page, setPage] = useState('landing');

  if (page === 'plants') {
    return <ProductList onNavigate={setPage} />;
  }

  if (page === 'cart') {
    return <CartItem onNavigate={setPage} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Paradise Nursery</h1>
        <p className="tagline">Houseplants that make a home feel alive.</p>
        <button className="get-started-button" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
      <div className="about-us-wrapper">
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
