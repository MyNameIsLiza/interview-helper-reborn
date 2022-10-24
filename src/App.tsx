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
          <main>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
