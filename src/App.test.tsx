import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./services/api');

describe('test', () => {
  it('renders home title', () => {
    render(<App />);
    const home = screen.getByTestId('home-title');
    expect(home).toBeInTheDocument();
    expect(home).toHaveTextContent('Home');
  });
});
