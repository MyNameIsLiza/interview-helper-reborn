import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './components/axillary/Navigation';
import Categories from './components/categories/Categories';
import Category from './components/category/Category';
import Topics from './components/topics/Topics';
import { fetchCategories } from './store/slices/categories';
import { useAppDispatch } from './store';

import 'antd/dist/antd.css';
import './App.css';

function App(): React.ReactElement {
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  /* */ useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={<h1 data-testid="home-title">Home</h1>}
                />
                <Route path="categories" element={<Categories />} />
                {/* <Route path="topics" element={<Topics />} /> */}
                <Route path="categories/:id" element={<Category />} />
              </Routes>
            </main>
          </div>
        </Router>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
