import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBuyNow = async () => {
    setActionMsg('');
    try {
      await api.post('/orders', { items: [{ productId: id, quantity: 1 }] });
      setActionMsg('Order placed successfully!');
      loadProduct();
    } catch (err) {
      setActionMsg(err.message);
    }
  };

  const handleWishlist = async () => {
    setActionMsg('');
    try {
      await api.post('/wishlist', { productId: id });
      setActionMsg('Added to wishlist!');
    } catch (err) {
      setActionMsg(err.message);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setActionMsg('');
    try {
      await api.post('/reviews', { productId: id, ...reviewForm });
      setActionMsg('Review submitted!');
      setReviewForm({ rating: 5, comment: '' });
      loadProduct();
    } catch (err) {
      setActionMsg(err.message);
    }
  };

  if (loading) return <p className="mx-auto max-w-4xl px-6 py-16 text-sm text-ink/50">Loading…</p>;
  if (error) return <p className="mx-auto max-w-4xl px-6 py-16 text-sm text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <span className="rounded-full bg-pine/10 px-3 py-1 text-xs font-medium text-pine">
        {product.category?.name}
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold">{product.title}</h1>
      <p className="mt-3 text-ink/70">{product.description}</p>

      <div className="mt-6 flex items-center gap-6">
        <span className="font-mono text-2xl font-semibold text-gold">৳{product.price}</span>
        <span className="font-mono text-sm text-ink/50">stock: {product.stock}</span>
      </div>

      {user ? (
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleBuyNow}
            className="rounded-lg bg-pine px-5 py-2.5 text-sm font-medium text-white hover:bg-pine-dark transition-colors"
          >
            Buy now
          </button>
          <button
            onClick={handleWishlist}
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium hover:border-ink transition-colors"
          >
            Add to wishlist
          </button>
        </div>
      ) : (
        <p className="mt-6 text-sm text-ink/50">Log in to buy this product or add it to your wishlist.</p>
      )}

      {actionMsg && <p className="mt-3 text-sm text-pine">{actionMsg}</p>}

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="font-display text-xl font-semibold">Reviews</h2>

        {user && (
          <form onSubmit={handleReview} className="mt-4 flex flex-col gap-3 rounded-xl border border-line p-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium uppercase tracking-wide text-ink/50">Rating</label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                className="rounded-lg border border-line bg-surface px-2 py-1 text-sm outline-none focus:border-pine"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} star{r > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              placeholder="Share your experience with this product…"
              className="min-h-[80px] rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-pine"
            />
            <button
              type="submit"
              className="self-start rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/80 transition-colors"
            >
              Submit review
            </button>
          </form>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {product.reviews?.length ? (
            product.reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-line p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{r.user?.name}</span>
                  <span className="font-mono text-xs text-gold">{'★'.repeat(r.rating)}</span>
                </div>
                {r.comment && <p className="mt-2 text-sm text-ink/70">{r.comment}</p>}
              </div>
            ))
          ) : (
            <p className="text-sm text-ink/50">No reviews yet — be the first to review this product.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
