import { useState, useCallback } from 'react';

export default function ProductDetails({
  product,
  onAddToCart,
  isCartPending,
  onClose,
  sectionRef
}) {
  const [panelWidth, setPanelWidth] = useState(0);

  const measureRef = useCallback((node) => {
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPanelWidth(Math.round(entry.contentRect.width));
      }
    });

    observer.observe(node);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <section ref={sectionRef} className="card details-section">
      {}
      <title>{`${product.name} - Mini E-Commerce Store`}</title>
      <meta name="description" content={product.shortDescription} />

      <div ref={measureRef} className="details-container">
        <div className="details-image-col">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info-col">
          <div className="details-top-bar">
            <span className="category-tag">{product.category}</span>
            <span className="ref-meta">
              Panel Width: {panelWidth}px (Press Esc to close)
            </span>
          </div>

          <h2>{product.name}</h2>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-description">{product.description}</p>

          <div className="details-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onAddToCart(product)}
              disabled={isCartPending}
            >
              {isCartPending ? 'Adding to Cart (Optimistic)...' : 'Add to Cart'}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Close Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}   