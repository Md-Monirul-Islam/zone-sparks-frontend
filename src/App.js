import {Routes, Route, Navigate } from 'react-router-dom';
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
import UserProfileUpdate from './account_app/UserProfileUpdate';

function App() {

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
  
    return isAuthenticated ? children : <Navigate to="/login/" />;
  };

  return (
    <>
    <Navbar />
      {/* <Routes>
        <Route path='/' element={<Home />} />
      </Routes> */}

      <Routes>
        <Route path='/signup/' element={<Signup />} />
      </Routes>

      <Routes>
        <Route path='/login/' element={<Login />} />
      </Routes>

      <Routes>
        <Route path='/add/category/' element={
          <ProtectedRoute>
            <AddCategory />
          </ProtectedRoute>
          } />
      </Routes>

      <Routes>
        <Route path='/category/list/' element={<CategoryList />} />
      </Routes>

      <Routes>
        <Route path="/categories/" element={
          <ProtectedRoute>
            <CategoryList />
          </ProtectedRoute>
          } />
      </Routes>

      <Routes>
        <Route path="/product/list/" element={<ProductList />} />
      </Routes>

      <Routes>
        <Route path="/add/product/" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
          } />
      </Routes>

      <Routes>
        <Route path="/edit/product/:productId" element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
          } />
      </Routes>

      <Routes>
        <Route
          path="/dashboard/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
    </Routes>

      <Routes>
        <Route
          path="/update/user/profile/"
          element={
            <ProtectedRoute>
              <UserProfileUpdate />
            </ProtectedRoute>
          }
        />
    </Routes>
    </>
  );
}

export default App;
