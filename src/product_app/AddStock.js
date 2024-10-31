import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../Variable';

const AddStock = () => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (searchTerm.length > 0) {
                try {
                    const response = await axios.get(`${baseUrl}/search-products/?query=${searchTerm}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            } else {
                setProducts([]);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleAddStock = async (e) => {
        e.preventDefault();
        setMessage('');
    
        if (!selectedProduct) {
            setMessage('Please select a product.');
            return;
        }
    
        // Validate quantity before sending the request
        if (quantity === '' || isNaN(quantity) || Number(quantity) <= 0) {
            setMessage('Please enter a valid quantity greater than 0.');
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
    
            const response = await axios.post(`${baseUrl}/add-stock/`, {
                product_id: selectedProduct.id,
                quantity: Number(quantity), // Convert to number
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status === 201) {
                setMessage(`Successfully added ${quantity} units to ${selectedProduct.name}.`);
                setSearchTerm('');
                setQuantity('');
                setSelectedProduct(null);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error adding stock:', error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.detail || 'Failed to add stock. Please check the quantity.');
            } else {
                setMessage('Failed to add stock. Please check the quantity.');
            }
        }
    };
    

    return (
        <div className="add-stock-container">
            <h2>Add Stock</h2>
            <form onSubmit={handleAddStock}>
                <div>
                    <label>Search Product:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                    {products.length > 0 && (
                        <ul className="search-results">
                            {products.map((product) => (
                                <li key={product.id} onClick={() => {
                                    setSelectedProduct(product);
                                    setSearchTerm(product.name);
                                    setProducts([]);
                                }}>
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Stock</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddStock;
