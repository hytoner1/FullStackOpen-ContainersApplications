import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todos text', () => {
  render(<App />);
  const linkElement = screen.getByText('Todos');
  expect(linkElement).toBeInTheDocument();
});
