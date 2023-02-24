import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import App from './App';
import theme from './styles/theme';
import store from './redux/config/configStore';
import Globalstyle from './styles/GlobalStyle';
import 'styles/font.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Globalstyle />
        <App />
      </CookiesProvider>
    </ThemeProvider>
  </Provider>,
);
