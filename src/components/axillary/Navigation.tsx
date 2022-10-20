import { Menu } from 'antd';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation(): React.ReactElement {
  const location = useLocation();
  const menuItems = useMemo(
    () => [
      {
        key: '/',
        label: <Link to="/">Home</Link>,
      },
      {
        key: '/categories',
        label: <Link to="/categories">Categories</Link>,
      },
    ],
    [],
  );

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={menuItems}
    />
  );
}
