import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../Variable';
import './ProductDetail.css';

const ProductDetail = ({ updateCartCount }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseUrl}/product-detail/${productId}/`);
                setProduct(response.data);

                // Check if the product is already in the cart
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const itemExists = cartItems.some(item => item.id === response.data.id);
                setIsInCart(itemExists);
            } catch (err) {
                setError('Failed to load product details.');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newItem = { id: product.id, name: product.name };

        if (!isInCart) {
            // Add item to cart
            cartItems.push(newItem);
            setIsInCart(true);
        } else {
            // Remove item from cart
            cartItems = cartItems.filter(item => item.id !== newItem.id);
            setIsInCart(false);
        }

        // Update local storage and cart count
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount(cartItems.length);
    };

    if (!product) {
        return <p className="text-danger">{error || 'Loading...'}</p>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-image">
                <img src={`${baseUrl}${product.product_image}`} alt={product.name} />
            </div>
            <div className="product-details">
                <h2>{product.name}</h2>
                <p className="price">Price: TK. {product.price}</p>
                <p>{product.description}</p>
                <p>Category: {product.category_name}</p>
                <button onClick={handleAddToCart} className="add-to-cart-button">
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
