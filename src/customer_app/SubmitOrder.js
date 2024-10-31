import axios from 'axios';
import { baseUrl } from '../Variable';

const submitOrder = async () => {
    const token = localStorage.getItem('token');
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    const orderUrl = `${baseUrl}/submit-order/`;
    console.log('Submitting order to:', orderUrl); // Log the URL

    try {
        const response = await axios.post(
            orderUrl,
            { cartItems },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        alert('Order submitted successfully');
        console.log(response.data);
    } catch (error) {
        console.error('Failed to submit order:', error);
        alert('Failed to submit order. Please try again.');
    }
};

export default submitOrder;
