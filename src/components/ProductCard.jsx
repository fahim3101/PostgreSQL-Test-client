import { Link } from 'react-router-dom';

const statusLabel = {
  ACTIVE: 'In stock',
  OUT_OF_STOCK: 'Out of stock',
  INACTIVE: 'Unavailable',
};

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-36 items-center justify-center border-b border-line bg-paper font-display text-3xl text-ink/20">
        {product.title.charAt(0)}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-pine/10 px-2 py-0.5 text-[11px] font-medium text-pine">
            {product.category?.name || 'Uncategorized'}
          </span>
          <span className="font-mono text-[11px] text-ink/40">{statusLabel[product.status]}</span>
        </div>
        <h3 className="font-display text-base font-semibold leading-snug group-hover:text-pine transition-colors">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink/60">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-lg font-semibold text-gold">৳{product.price}</span>
          <span className="font-mono text-xs text-ink/40">stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
