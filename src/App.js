import {Routes,Route} from 'react-router-dom';
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

function App() {
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
        <Route path='/add/category/' element={<AddCategory />} />
      </Routes>

      <Routes>
        <Route path='/category/list/' element={<CategoryList />} />
      </Routes>

      <Routes>
        <Route path="/categories/" element={<CategoryList />} />
      </Routes>

      <Routes>
        <Route path="/product/list/" element={<ProductList />} />
      </Routes>

      <Routes>
        <Route path="/add/product/" element={<AddProduct />} />
      </Routes>

      <Routes>
        <Route path="/edit/product/:productId" element={<EditProduct />} />
      </Routes>

      <Routes>
        <Route path="/dashboard/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
