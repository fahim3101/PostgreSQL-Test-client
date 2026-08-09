import { useEffect, useState } from 'react';
import api from '../api/axios';

const statusColor = {
  PENDING: 'bg-amber-100 text-amber-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/orders')
      .then((res) => setOrders(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold">My orders</h1>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="mt-6 text-sm text-ink/50">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-sm text-ink/50">You haven't placed any orders yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink/40">#{order.id.slice(0, 8)}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="font-mono">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm font-medium">
                <span>Total</span>
                <span className="font-mono text-gold">৳{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
