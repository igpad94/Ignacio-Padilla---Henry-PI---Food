import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from "./store";
import RecipeCreation from './components/RecipeCreation';

test('renders a create your own recipe title', () => {
  render(<Provider store={store}> <BrowserRouter><RecipeCreation /> </BrowserRouter></Provider>);
  const createTitle = screen.getByText("Create your own Recipe:");
  expect(createTitle).toBeInTheDocument();
});
