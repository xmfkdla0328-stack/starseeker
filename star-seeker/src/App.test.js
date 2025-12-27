import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home title', () => {
  render(<App />);
  const title = screen.getByText(/Star Seeker/i);
  expect(title).toBeInTheDocument();
});
