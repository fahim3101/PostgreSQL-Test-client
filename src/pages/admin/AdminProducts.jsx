import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = { title: '', description: '', price: '', stock: '', categoryId: '' };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([api.get('/products'), api.get('/categories')]);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0),
      });
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-pine">Admin</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Manage products</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 rounded-xl border border-line p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Category</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Price (৳)</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Description</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
          />
        </div>
        <button
          type="submit"
          className="self-start rounded-lg bg-pine px-5 py-2.5 text-sm font-medium text-white hover:bg-pine-dark transition-colors"
        >
          Add product
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-ink/50">Loading…</p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl border border-line p-4">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="font-mono text-sm text-gold">
                  ৳{p.price} · stock: {p.stock} · {p.category?.name}
                </p>
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium hover:border-red-400 hover:text-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
