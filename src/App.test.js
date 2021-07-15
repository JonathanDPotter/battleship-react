import { render, screen } from '@testing-library/react';
import App { state }from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(state.thing).toBe(5);

});
