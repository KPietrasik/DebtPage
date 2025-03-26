import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom'


describe('Loader', () => {
  it('renders the loader overlay', () => {
    render(<Loader />);
    const loaderOverlay = screen.getByTestId('loader-overlay');
    expect(loaderOverlay).toBeInTheDocument();
  });

  it('renders the spinner', () => {
    render(<Loader />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
