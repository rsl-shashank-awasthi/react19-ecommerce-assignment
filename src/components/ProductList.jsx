import { use } from 'react';

export default function ProductList({ productsPromise, selectedId, onSelectProduct }) {
  const products = use(productsPromise);

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isSelected = product.id === selectedId;
        return (
          <article
            key={product.id}
            className={`product-card ${isSelected ? 'product-card-selected' : ''}`}
          >
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} loading="lazy" />
              <span className="category-tag">{product.category}</span>
            </div>

            <div className="product-body">
              <h3>{product.name}</h3>
              <p className="product-short-desc">{product.shortDescription}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => onSelectProduct(product)}
                >
                  {isSelected ? 'Viewing Details' : 'View Details'}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}