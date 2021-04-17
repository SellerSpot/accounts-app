import { initializeGlobalConfig } from 'config/globalConfig';
import { ROUTES } from 'config/routes';
import React, { ReactElement, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import '../../styles/core.scss';
import styles from './app.module.scss';
import { introduceDelay } from 'utilities/general';
import { AppPreloader } from '@sellerspot/universal-components';

// global actions
initializeGlobalConfig(); // application common initilizers goes here

export const App = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await introduceDelay();
            setIsLoading(false);
        }).call(null);
    }, []);

    return (
        <div className={styles.appWrapper}>
            {isLoading ? (
                <AppPreloader />
            ) : (
                <div className={cn(styles.appContainer)}>
                    <Switch>
                        {/* all other routes should be nested above this route because it is '/' route hence should be placed atlast */}
                        <Route path={ROUTES.DASHBOARD}>
                            <div>Sellerspot accounts app</div>
                        </Route>
                    </Switch>
                </div>
            )}
            {/* global components */}
        </div>
    );
};
