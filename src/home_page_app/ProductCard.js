import React from 'react';
import './ProductList.css'

const ProductCard = ({ product }) => {
    return (
        <div className="card">
            <img src={product.product_image || 'placeholder.jpg'} alt={product.name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: TK. {product.price}</p>
                {/* <p className="card-text">{product.description}</p> */}
            </div>
        </div>
    );
};

export default ProductCard;
