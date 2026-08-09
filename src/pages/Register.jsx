import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-ink/60">Join SCIC Market to buy, review and track orders.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Full name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            placeholder="Fahim Rana"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange('password')}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Phone (optional)</label>
          <input
            value={form.phone}
            onChange={handleChange('phone')}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            placeholder="01XXXXXXXXX"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-lg bg-pine px-4 py-2.5 text-sm font-medium text-white hover:bg-pine-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="mt-6 text-sm text-ink/60">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-pine">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
