import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateBookPage from './pages/createBookPage.jsx'
import EditPage from './pages/EditPage.jsx';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/slices/auth.js';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-book' element={<CreateBookPage />} />
        <Route path='/edit-book/:id' element={<EditPage />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
