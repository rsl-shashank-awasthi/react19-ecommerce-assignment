import { use } from 'react';
import { UserContext } from '../context/UserContext';

export default function Navbar({ cartCount, isCartPending, onFocusRegister }) {
  const { user } = use(UserContext);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-title">Northstar Store</span>
      </div>

      <div className="navbar-status">
        {user ? (
          <div className="user-badge">
            <span className="status-dot"></span>
            <span>
              Signed in as <strong>{user.name}</strong> ({user.email})
            </span>
          </div>
        ) : (
          <button type="button" className="btn-link" onClick={onFocusRegister}>
            Not registered? Sign up below
          </button>
        )}

        <div className={`cart-pill ${isCartPending ? 'cart-updating' : ''}`}>
          <span>Cart: {cartCount}</span>
          {isCartPending && <span className="sync-tag">Syncing...</span>}
        </div>
      </div>
    </header>
  );
}