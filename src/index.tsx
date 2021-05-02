import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@sellerspot/universal-components';

import { store } from 'store/store';
import { App } from 'layouts/App/App';
import { COLORS, FONT_SIZE } from 'config/theme';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider colors={COLORS} fontSizes={FONT_SIZE}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
