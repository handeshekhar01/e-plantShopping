import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import Navbar from './Navbar';

// Generates a simple potted-plant thumbnail so the app works without external images.
// Replace `image` with real photo URLs if you prefer.
const thumb = (leaf, pot) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#eef3e6"/>
      <ellipse cx="60" cy="52" rx="14" ry="30" fill="${leaf}"/>
      <ellipse cx="40" cy="62" rx="12" ry="24" fill="${leaf}" transform="rotate(-35 40 62)"/>
      <ellipse cx="80" cy="62" rx="12" ry="24" fill="${leaf}" transform="rotate(35 80 62)"/>
      <path d="M38 82h44l-6 28H44z" fill="${pot}"/>
      <rect x="35" y="78" width="50" height="8" rx="3" fill="${pot}"/>
    </svg>`
  );

const categories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: 15, image: thumb('#2f6b3a', '#c56a3d'), description: 'Filters toxins and produces oxygen at night.' },
      { name: 'Spider Plant', cost: 12, image: thumb('#5b9a45', '#b9774b'), description: 'Removes formaldehyde and xylene from indoor air.' },
      { name: 'Peace Lily', cost: 18, image: thumb('#1f5a3b', '#8f8f8f'), description: 'Removes mold spores and neutralizes common toxins.' },
      { name: 'Boston Fern', cost: 20, image: thumb('#3f8a4a', '#a0603b'), description: 'Adds humidity and filters pollutants.' },
      { name: 'Rubber Plant', cost: 17, image: thumb('#234e32', '#d08a5a'), description: 'Absorbs airborne chemicals and tolerates low light.' },
      { name: 'Aloe Vera', cost: 14, image: thumb('#6aa87a', '#c56a3d'), description: 'Purifies air and soothes minor burns.' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', cost: 20, image: thumb('#7a6fb0', '#c56a3d'), description: 'Calming scent that supports relaxation and sleep.' },
      { name: 'Jasmine', cost: 18, image: thumb('#4c9a5f', '#d9d2c3'), description: 'Sweet, uplifting fragrance when in bloom.' },
      { name: 'Rosemary', cost: 15, image: thumb('#3d7a52', '#a0603b'), description: 'Woody aroma, also great for cooking.' },
      { name: 'Mint', cost: 12, image: thumb('#59b36e', '#b9774b'), description: 'Fresh scent that deters pests.' },
      { name: 'Lemon Balm', cost: 14, image: thumb('#8ab84a', '#c56a3d'), description: 'Lemony aroma that eases stress.' },
      { name: 'Gardenia', cost: 22, image: thumb('#2c6a46', '#e8e1d2'), description: 'Rich floral scent with glossy leaves.' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', cost: 25, image: thumb('#1f5a3b', '#8f8f8f'), description: 'Thrives on neglect and low light.' },
      { name: 'Pothos', cost: 10, image: thumb('#6bb04f', '#c56a3d'), description: 'Fast-growing vine that forgives missed waterings.' },
      { name: 'Cast Iron Plant', cost: 19, image: thumb('#1d4a2e', '#b9774b'), description: 'Nearly indestructible in shade.' },
      { name: 'Jade Plant', cost: 16, image: thumb('#4d9a63', '#d08a5a'), description: 'Succulent that stores water in its leaves.' },
      { name: 'Chinese Evergreen', cost: 21, image: thumb('#3b7d4f', '#a0603b'), description: 'Patterned leaves, adapts to most rooms.' },
      { name: 'Dracaena', cost: 23, image: thumb('#2f7a4a', '#d9d2c3'), description: 'Tall, sculptural, and easy to keep.' },
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // addedToCart[plant.name] is true when that plant is already in the cart
  const addedToCart = Object.fromEntries(cartItems.map((item) => [item.name, true]));

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  return (
    <div className="page">
      <Navbar onNavigate={onNavigate} current="plants" />
      <main className="product-grid-container">
        {categories.map((group) => (
          <section key={group.category} className="product-list category">
            <h2>{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => {
                const added = addedToCart[plant.name];
                return (
                  <article className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
