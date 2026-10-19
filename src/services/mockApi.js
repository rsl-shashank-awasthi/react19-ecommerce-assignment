// I took the API data from chatGPT like images and description

export const PRODUCTS = [
  {
    id: 1,
    name: 'Keychron K2 Mechanical Keyboard',
    price: 89.0,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Compact 75% layout wireless mechanical keyboard.',
    description:
      'A tactile wireless mechanical keyboard built for Mac and Windows. Features hot-swappable Gateron G Pro switches, white LED backlighting, and up to 72 hours of battery life.'
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Headphones',
    price: 348.0,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Over-ear wireless noise-canceling headphones.',
    description:
      'Engineered with dual processors and eight microphones for distraction-free listening and crystal-clear call quality. Lightweight synthetic leather design with 30-hour battery life.'
  },
  {
    id: 3,
    name: 'Logitech MX Master 3S Mouse',
    price: 99.0,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Ergonomic wireless mouse with quiet clicks.',
    description:
      'Features an 8000 DPI optical sensor that tracks on virtually any surface including glass, MagSpeed electromagnetic scrolling, and ergonomic sculpted comfort.'
  },
  {
    id: 4,
    name: 'Bellroy Classic Backpack',
    price: 149.0,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Water-resistant daily commuter backpack.',
    description:
      'Crafted from durable recycled woven fabric with padded shoulder straps, a protective 16-inch laptop sleeve, and quick-access front organization pockets.'
  }
];

export function fetchProducts(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load catalog from server. Please try again.'));
      } else {
        resolve(PRODUCTS);
      }
    }, 1400);
  });
}

export function addToCartRequest(productId, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Inventory sync failed for item #${productId}. Cart reverted.`));
      } else {
        resolve({ success: true, productId });
      }
    }, 1500);
  });
}