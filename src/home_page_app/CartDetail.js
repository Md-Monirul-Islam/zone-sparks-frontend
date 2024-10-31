import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';
import './CartDetail.css';

const CartDetail = ({ updateCartCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0); // Ensure totalPrice is initialized as a number

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const productIds = storedCartItems.map(item => item.id);

                const responses = await Promise.all(
                    productIds.map(id => axios.get(`${baseUrl}/product-detail/${id}/`))
                );

                const itemsWithDetails = responses.map(response => response.data);
                setCartItems(itemsWithDetails);
                calculateTotalPrice(itemsWithDetails); // Calculate total price on fetch
            } catch (err) {
                setError('Failed to load cart details.');
            }
        };

        fetchCartDetails();
    }, []);

    // Function to calculate total price
    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0); // Ensure item.price is treated as a number
        setTotalPrice(total);
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems); // Recalculate total price after removal

        const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cartItems')).filter(
            item => item.id !== productId
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedLocalStorageCart));

        // Update cart count
        updateCartCount(updatedLocalStorageCart.length);
    };

    if (cartItems.length === 0) {
        return <h2 className="text-warning ms-5">{error || 'Your cart is empty.'}</h2>;
    }

    return (
        <div className="cart-detail-container">
            <h2>Cart Details</h2>
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={`${baseUrl}${item.product_image}`} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>Price: TK. {item.price}</p>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">
                            Remove from Cart
                        </button>
                    </div>
                </div>
            ))}
            <p className="total-items">Total Items: {cartItems.length}</p>
            <p className="total-price">Total Price: TK. {totalPrice.toFixed(2)}</p>
            <div>
                <button>Place your order</button>
            </div>
        </div>
    );
};

export default CartDetail;
