import { Spin } from 'antd';
import React from 'react';

import './Loader.css';

export default function Loader(): React.ReactElement {
  return (
    <div className="Loader">
      <Spin size="large" />
    </div>
  );
}
