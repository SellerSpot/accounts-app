import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@sellerspot/universal-components';

import { App } from 'layouts/App/App';
import { COLORS, FONT_SIZE } from 'config/theme';

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider colors={COLORS} fontSizes={FONT_SIZE}>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
