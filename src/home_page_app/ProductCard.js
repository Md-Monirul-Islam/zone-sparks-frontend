import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductCard = ({ product, isInCart, handleAddToCart }) => {
    return (
        <div className="card">
            <img src={product.product_image || 'placeholder.jpg'} alt={product.name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/product/details/${product.id}/`}>{product.name}</Link>
                </h5>
                <p className="card-text">Price: TK. {product.price}</p>
                <button onClick={handleAddToCart} className="buy-button">
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
