import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store/store';
import { App } from 'layouts/App/App';
import { ThemeProvider } from '@sellerspot/universal-components';
import { COLORS, FONT_SIZE } from 'config/theme';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider colors={COLORS} fontSizes={FONT_SIZE}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
