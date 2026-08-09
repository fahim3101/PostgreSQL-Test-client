import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/wishlist');
      setItems(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/wishlist/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold">My wishlist</h1>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="mt-6 text-sm text-ink/50">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-sm text-ink/50">
          Your wishlist is empty. <Link to="/" className="text-pine font-medium">Browse products</Link>.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-line p-4">
              <div>
                <Link to={`/products/${item.product.id}`} className="font-medium hover:text-pine">
                  {item.product.title}
                </Link>
                <p className="font-mono text-sm text-gold">৳{item.product.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium hover:border-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
