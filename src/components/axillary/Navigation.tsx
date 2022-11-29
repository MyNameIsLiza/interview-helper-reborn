import { Menu } from 'antd';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation(): React.ReactElement {
  const location = useLocation();
  const menuItems = useMemo(
    () => [
      {
        key: '/',
        label: (
          <Link to="/" className="text-main">
            Home
          </Link>
        ),
      },
      {
        key: '/categories',
        label: (
          <Link to="/categories" className="text-main">
            Categories
          </Link>
        ),
      },
      {
        key: '/topics',
        label: (
          <Link to="/topics" className="text-main">
            Topics
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <header>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </header>
  );
}
