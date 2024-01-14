import { Link } from "react-router-dom";

export default function Card({ product }) {
  function formatPrice(price) {
    return new Intl.NumberFormat("en-DE").format(price);
  }
  return (
    <>
      <Link to={`/${product.id}`}>
        <div className="card w-[100%] h-[350px] border border-solid flex flex-col justify-center items-center bg-gray-100 rounded p-1">
          <img
            src={product.imgUrl}
            className="w-[80%] h-[60%] border-solid border rounded-sm"
          />
          <div className="productName">
            <span className="text-xl font-bold">{product.name}</span>
          </div>
          <div className="productPrice">
            <span>Rp. {formatPrice(product.price)}</span>
          </div>
          <div className="productStock">
            Stock: <span>{product.stock}</span>
          </div>
          <div className="productCategory">
            Gene: <span>{product.Category.name}</span>
          </div>
          <div className="description w-[90%] overflow-auto">
            {product.description}
          </div>
        </div>
      </Link>
    </>
  );
}
