import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-pine' : 'text-ink/60 hover:text-ink'}`;

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          SCIC <span className="text-pine">Market</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Products
          </NavLink>
          {user && (
            <>
              <NavLink to="/wishlist" className={navLinkClass}>
                Wishlist
              </NavLink>
              <NavLink to="/orders" className={navLinkClass}>
                My Orders
              </NavLink>
            </>
          )}
          {isAdmin && (
            <>
              <NavLink to="/admin/categories" className={navLinkClass}>
                Manage Categories
              </NavLink>
              <NavLink to="/admin/products" className={navLinkClass}>
                Manage Products
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden font-mono text-xs text-ink/50 sm:inline">
                {user.name} · {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:border-ink transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink/70 hover:text-ink">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-pine px-4 py-1.5 text-sm font-medium text-white hover:bg-pine-dark transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
