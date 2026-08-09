import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
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
      await api.post('/categories', form);
      setForm({ name: '', description: '' });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-pine">Admin</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Manage categories</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 rounded-xl border border-line p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            placeholder="Electronics"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Description</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            placeholder="Optional"
          />
        </div>
        <button type="submit" className="rounded-lg bg-pine px-5 py-2.5 text-sm font-medium text-white hover:bg-pine-dark transition-colors">
          Add category
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-ink/50">Loading…</p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-xl border border-line p-4">
              <div>
                <p className="font-medium">{c.name}</p>
                {c.description && <p className="text-sm text-ink/50">{c.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(c.id)}
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

export default AdminCategories;
