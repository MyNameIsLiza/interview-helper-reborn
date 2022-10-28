import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

jest.mock('./services/api');

describe('test', () => {
  it('renders home title', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const home = screen.getByTestId('home-title');
    expect(home).toBeInTheDocument();
    expect(home).toHaveTextContent('Home');
  });
});
