import { store } from 'store/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { App } from 'layouts/App/App';
import { COLORS, FONT_SIZE } from 'config/theme';
import { ThemeProvider } from '@sellerspot/universal-components';

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
