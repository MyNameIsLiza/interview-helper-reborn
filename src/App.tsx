import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import Categories from './components/categories/Categories';
import { fetchCategories } from './store/slices/categories';
import { useAppDispatch } from './store';

import 'antd/dist/antd.css';
import './App.css';

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState('home');

  const menuOnClick: MenuProps['onClick'] = (event) => {
    setCurrent(event.key);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <div>
          <Menu
            onClick={menuOnClick}
            mode="horizontal"
            selectedKeys={[current]}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link to="/categories">Categories</Link>
            </Menu.Item>
          </Menu>
          <Routes>
            <Route path="/" element={<>Home</>} />
            <Route path="categories" element={<Categories />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
