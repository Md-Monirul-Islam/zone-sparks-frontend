import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { baseUrl } from '../Variable';


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products-show-in-hoem-page/`);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load products.');
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center my-4">All Products</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
