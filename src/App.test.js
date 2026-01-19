import { render, screen } from '@testing-library/react';
import App from './App';

test('renders deadline countdown', () => {
  render(<App />);
  // Check that the app renders with deadline text
  const deadlineText = screen.getByText(/まで，あと|から，既に/);
  expect(deadlineText).toBeInTheDocument();
});
