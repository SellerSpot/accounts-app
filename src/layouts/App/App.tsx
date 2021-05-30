import React, { ReactElement, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import cn from 'classnames';
import {
    AppPreloader,
    colorThemes,
    fontSizeThemes,
    Logo,
    LogoText,
    Notify,
    ThemeProvider,
} from '@sellerspot/universal-components';

import { ROUTES } from 'config/routes';
import { CONFIG } from 'config/config';

import '../../styles/core.scss';
import styles from './app.module.scss';

import { initializeGlobalConfig } from 'config/globalConfig';
import { SignUp } from 'pages/SignUp/SignUp';
import { SignIn } from 'pages/SignIn/SignIn';
import { IdentifyStore } from 'pages/IdentifyStore/IdentifyStore';
import { CachedSignIn } from 'pages/CachedSignIn/CachedSignIn';
import { ForgotStoreUrl } from 'pages/ForgotStoreUrl/ForgotStoreUrl';
import { ForgotPassword } from 'pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from 'pages/ResetPassword/ResetPassword';

// global actions
initializeGlobalConfig(); // application common initilizers goes here

export const App = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(false);
        }).call(null);
    }, []);

    const logoClickHandler = () => {
        window.open(CONFIG.LANDING_APP_URL, '_self');
    };

    const currentColors = colorThemes['default'];
    const currentFontSizes = fontSizeThemes['default'];

    return (
        <ThemeProvider colors={currentColors} fontSizes={currentFontSizes}>
            <div className={styles.appWrapper}>
                {isLoading ? (
                    <AppPreloader />
                ) : (
                    <div className={cn(styles.appContainer)}>
                        <div className={styles.logoWrapper} onClick={logoClickHandler}>
                            <Logo className={styles.logoicon} />
                            <LogoText className={styles.logoText} />
                        </div>
                        <Switch>
                            {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                            <Route path={ROUTES.SIGN_UP}>
                                <SignUp />
                            </Route>
                            <Route path={ROUTES.CACHED_SIGN_IN}>
                                <CachedSignIn />
                            </Route>
                            <Route path={ROUTES.IDENTIFY_STORE}>
                                <IdentifyStore />
                            </Route>
                            <Route path={ROUTES.SIGN_IN}>
                                <SignIn />
                            </Route>
                            <Route path={ROUTES.FORGOT_STORE_URL}>
                                <ForgotStoreUrl />
                            </Route>
                            <Route path={ROUTES.FORGOT_PASSWORD}>
                                <ForgotPassword />
                            </Route>
                            <Route path={ROUTES.RESET_PASSWORD}>
                                <ResetPassword />
                            </Route>
                            <Route>
                                <Redirect to={ROUTES.CACHED_SIGN_IN} />
                            </Route>
                        </Switch>
                    </div>
                )}
                {/* globalcomponents */}
                <Notify />
            </div>
        </ThemeProvider>
    );
};
