import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateBookPage from './pages/CreateBookPage.js'
import EditPage from './pages/EditPage.js';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-book' element={<CreateBookPage />} />
        <Route path='/edit-book/:id' element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
