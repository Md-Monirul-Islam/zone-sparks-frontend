import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductCard = ({ product, isInCart, handleAddToCart }) => {
    return (
      <div className="product-card card shadow-sm border-0 rounded-lg overflow-hidden">
        <Link to={`/product/details/${product.id}`}>
          <img
            src={product.product_image || 'placeholder.jpg'}
            alt={product.name}
            className="card-img-top img-fluid"
          />
        </Link>
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="product-details">
            <h5 className="card-title">
              <Link to={`/product/details/${product.id}`}>{product.name}</Link>
            </h5>
            <p className="card-text text-muted">Price: TK. {product.price}</p>
          </div>
          <div className="button-group d-flex mt-auto">
            <button
              onClick={handleAddToCart}
              className={`buy-button btn btn-sm ${isInCart ? 'btn-danger' : 'btn-primary'}`}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            <button className="stock-status btn btn-sm btn-warning">
              {product.stock_status}
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;
