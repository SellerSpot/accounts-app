import { Switch, Route } from 'react-router-dom';
import React, { ReactElement, useEffect, useState } from 'react';
import { SignUp } from 'pages/SignUp/SignUp';
import { ROUTES } from 'config/routes';
import { initializeGlobalConfig } from 'config/globalConfig';
import { CONFIG } from 'config/config';
import cn from 'classnames';
import '../../styles/core.scss';
import { AppPreloader, Logo, LogoText } from '@sellerspot/universal-components';
import styles from './app.module.scss';

// global actions
initializeGlobalConfig(); // application common initilizers goes here

export const App = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // await introduceDelay();
            setIsLoading(false);
        }).call(null);
    }, []);

    const logoClickHandler = () => {
        window.open(CONFIG.LANDING_APP_URL, '_self');
    };

    return (
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
                    </Switch>
                </div>
            )}
            {/* globalcomponents */}
        </div>
    );
};
