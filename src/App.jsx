import { Suspense, useState, useRef, useOptimistic, useTransition } from 'react';
import { preconnect, prefetchDNS, preload } from 'react-dom';
import { UserProvider } from './context/UserContext';
import { fetchProducts, addToCartRequest, PRODUCTS } from './services/mockApi';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

export default function App() {
  preconnect('https://images.unsplash.com');
  prefetchDNS('https://images.unsplash.com');
  preload(PRODUCTS[0].image, { as: 'image' });

  const [simulateLoadError, setSimulateLoadError] = useState(false);
  const [productsPromise, setProductsPromise] = useState(() => fetchProducts(false));
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartCount, setCartCount] = useState(2);
  const [simulateCartFail, setSimulateCartFail] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(null);
  const [isCartPending, startTransition] = useTransition();

  const [optimisticCartCount, addOptimisticCart] = useOptimistic(
    cartCount,
    (currentCount, increment) => currentCount + increment
  );

  const nameInputRef = useRef(null);
  const detailsSectionRef = useRef(null);

  function handleReloadProducts(shouldFail = simulateLoadError) {
    setSelectedProduct(null);
    setProductsPromise(fetchProducts(shouldFail));
  }

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  function handleAddToCart(product) {
    setCartFeedback(null);

    startTransition(async () => {
      addOptimisticCart(1);

      try {
        await addToCartRequest(product.id, simulateCartFail);
        setCartCount((prev) => prev + 1);
        setCartFeedback({
          type: 'success',
          text: `Added "${product.name}" to your cart.`
        });
      } catch (err) {
        setCartFeedback({
          type: 'error',
          text: err.message
        });
      }
    });
  }

  return (
    <UserProvider>
      {}
      {!selectedProduct && (
        <>
          <title>Mini E-Commerce Store - Products</title>
          <meta
            name="description"
            content="Browse mechanical keyboards, headphones, and workspace gear."
          />
        </>
      )}

      <div className="app-shell">
        <Navbar
          cartCount={optimisticCartCount}
          isCartPending={isCartPending}
          onFocusRegister={() => nameInputRef.current?.focus()}
        />

        {}
        <div className="dev-toolbar">
          <span className="toolbar-label">Simulation Controls:</span>
          <button
            type="button"
            className="btn-small"
            onClick={() => handleReloadProducts(false)}
          >
            Reload Products (Suspense)
          </button>
          <button
            type="button"
            className="btn-small btn-danger-outline"
            onClick={() => {
              setSimulateLoadError(true);
              handleReloadProducts(true);
            }}
          >
            Trigger Product API Error
          </button>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={simulateCartFail}
              onChange={(e) => setSimulateCartFail(e.target.checked)}
            />
            Simulate &quot;Add to Cart&quot; API Failure
          </label>
        </div>

        {cartFeedback && (
          <div
            className={`alert ${
              cartFeedback.type === 'error' ? 'alert-error' : 'alert-success'
            }`}
          >
            {cartFeedback.text}
          </div>
        )}

        <main className="main-grid">
          <div className="catalog-column">
            <section className="card">
              <div className="section-header">
                <h2>Product Catalog</h2>
                <p className="muted-text">
                  Select any product below to view specs and add to your cart.
                </p>
              </div>

              <ErrorBoundary
                key={ String(simulateLoadError) }
                onReset={() => {
                  setSimulateLoadError(false);
                  handleReloadProducts(false);
                }}
              >
                <Suspense
                  fallback={
                    <div className="loading-skeleton">
                      <div className="spinner"></div>
                      <p>Fetching product inventory...</p>
                    </div>
                  }
                >
                  <ProductList
                    productsPromise={productsPromise}
                    selectedId={selectedProduct?.id}
                    onSelectProduct={handleSelectProduct}
                  />
                </Suspense>
              </ErrorBoundary>
            </section>

            <ProductDetails
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              isCartPending={isCartPending}
              onClose={() => setSelectedProduct(null)}
              sectionRef={detailsSectionRef}
            />
          </div>

          <aside className="sidebar-column">
            <RegisterForm nameInputRef={nameInputRef} />
          </aside>
        </main>
      </div>
    </UserProvider>
  );
}