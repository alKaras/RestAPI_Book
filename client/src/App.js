import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateBookPage from './pages/ActionBookPages/CreateBookPage'
import EditPage from './pages/ActionBookPages/EditBookPage/';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/slices/authSlice.js';
import { CreateReview } from './pages/Reviews/CreateReview.jsx';
import { Reviews } from './pages/Reviews/index.jsx';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);
    
  return (
    <div className='wrapper'>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-book' element={<CreateBookPage />} />
          <Route path='/edit-book/:id' element={<EditPage />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Registration />} />
          <Route path='/write-review/:id' element={<CreateReview />} />
          <Route path='/reviews/:id' element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
