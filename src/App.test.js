import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tournament heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Torneo de Fútbol FC 26/i);
  expect(headingElement).toBeInTheDocument();
});
