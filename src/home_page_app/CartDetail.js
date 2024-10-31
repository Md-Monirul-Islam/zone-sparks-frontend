import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../Variable';
import './CartDetail.css';

const CartDetail = ({ updateCartCount }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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
                calculateTotalPrice(itemsWithDetails);
            } catch (err) {
                setError('Failed to load cart details.');
            }
        };

        fetchCartDetails();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
        setTotalPrice(total);
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);

        const updatedLocalStorageCart = JSON.parse(localStorage.getItem('cartItems')).filter(
            item => item.id !== productId
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedLocalStorageCart));

        updateCartCount(updatedLocalStorageCart.length);
    };

    const handlePlaceOrder = async () => {
        // Check if the user is logged in
        if (!token) {
            alert('You must be logged in to place an order.');
            navigate('/login/'); // Redirect to login page
            return;
        }

        try {
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Define payload to send to backend
            const payload = {
                cartItems: storedCartItems,
                paymentMethod: 'Cash On Delivery',
                totalAmount: totalPrice,
            };

            // Send a POST request to submit the order
            const response = await axios.post(`${baseUrl}/submit/order/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include auth token if required
                },
            });

            if (response.status === 201) {
                alert('Order placed successfully!');

                // Clear cart items from local storage and state
                localStorage.removeItem('cartItems');
                setCartItems([]);
                setTotalPrice(0);
                updateCartCount(0); // Update cart count to 0
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order');
        }
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
                <button onClick={handlePlaceOrder}>Place your order</button>
            </div>
        </div>
    );
};

export default CartDetail;
