import {Routes,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './account_app/Signup';
import Login from './account_app/Login';
import Navbar from './components/Navbar';

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
    </>
  );
}

export default App;
