import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

const theme = createTheme();

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

test('renders app title', () => {
  renderWithProviders(<App />);
  const titleElement = screen.getByText(/Full-Stack CRUD Application/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders footer', () => {
  renderWithProviders(<App />);
  const footerElement = screen.getByText(/Full-Stack CRUD Foundation © 2024/i);
  expect(footerElement).toBeInTheDocument();
});

