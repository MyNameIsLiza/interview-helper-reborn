import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './components/axillary/Navigation';
import Categories from './components/categories/Categories';
import { fetchCategories } from './store/slices/categories';
import { useAppDispatch } from './store';

import 'antd/dist/antd.css';
import './App.css';

function App(): React.ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="categories" element={<Categories />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
