import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateBookPage from './pages/createBookPage.js'
import EditPage from './pages/EditPage.js';
import Login from './pages/Login/index.js';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-book' element={<CreateBookPage />} />
        <Route path='/edit-book/:id' element={<EditPage />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
