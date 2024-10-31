import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './account_app/Signup';
import Login from './account_app/Login';
import Navbar from './components/Navbar';
import AddCategory from './category/AddCategory';
import CategoryList from './category/CategoryList';
import ProductList from './product_app/ProductList';
import AddProduct from './product_app/AddProduct';
import EditProduct from './product_app/EditProduct';
import Dashboard from './dashboard/Dashboard';
import HomePage from './home_page_app/HomePage';
import ProductDetail from './home_page_app/ProductDetail';
import CartDetail from './home_page_app/CartDetail';
import UserProfile from './customer_app/UserProfile';
import UserProfileUpdate from './account_app/UserProfileUpdate';



function App() {
    const ProtectedRoute = ({ children }) => {
        const isAuthenticated = !!localStorage.getItem('token');
        return isAuthenticated ? children : <Navigate to="/login/" />;
    };

    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = (count) => {
        setCartCount(count);
    };

    return (
        <>
            <Navbar cartCount={cartCount} />
            <Routes>
                <Route path='/' element={<HomePage updateCartCount={updateCartCount} />} />

                <Route path='/product/details/:productId/' element={<ProductDetail updateCartCount={updateCartCount} />} />

                <Route path="/cart/" element={<CartDetail updateCartCount={updateCartCount} />} />

                <Route path='/signup/' element={<Signup />} />

                <Route path='/login/' element={<Login />} />

                <Route path='/add/category/' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
                
                <Route path="/categories/" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />

                <Route path="/product/list/" element={<ProductList />} />

                <Route path="/add/product/" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />

                <Route path="/edit/product/:productId" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />

                <Route path="/dashboard/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                <Route path="/user-profile/:userId" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                
                <Route path="/update/user/profile/" element={<ProtectedRoute><UserProfileUpdate /></ProtectedRoute>} />

            </Routes>
        </>
    );
}

export default App;
