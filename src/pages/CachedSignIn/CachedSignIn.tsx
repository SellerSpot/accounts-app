import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import CachedSignInService from './CachedSignIn.service';
import { IStoreDetail } from './CachedSignIn.types';

import cachedSignInStyles from './CachedSignIn.module.scss';
import commonStyles from '../../styles/common.module.scss';
import { Loader } from 'components/Loader/Loader';

export const CachedSignIn = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [stores, setStores] = useState<IStoreDetail[]>([]);

    const flllSignedInState = async () => {
        const signedInStores = await CachedSignInService.getSignedInStore();
        if (signedInStores.length) {
            setStores(signedInStores);
            setIsLoading(false);
        } else {
            history.push(ROUTES.IDENTIFY_STORE);
        }
    };

    // effects
    useEffect(() => {
        flllSignedInState();
    }, []);

    const signInWithDifferentAccountHandler = () => history.push(ROUTES.SIGN_UP);
    const signupHandler = () => history.push(ROUTES.SIGN_UP);
    const signInWithHandler = (key: number) => {
        // do signin rediretion with key
        const store = stores[key];
        history.push(ROUTES.SIGN_UP, store);
    };

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
                <div className={cachedSignInStyles.cachedButtonsWrapper}>
                    {stores?.map((store, key) => (
                        <Button
                            key={key}
                            type="button"
                            theme="primary"
                            variant="outlined"
                            size="large"
                            label={store.name}
                            fullWidth={true}
                            onClick={() => signInWithHandler(key)}
                        />
                    ))}
                    <Button
                        type="button"
                        theme="primary"
                        variant="contained"
                        size="large"
                        label="Signin to a different store"
                        fullWidth={true}
                        onClick={signInWithDifferentAccountHandler}
                    />
                    <h6 className={commonStyles.separatorText}>or</h6>
                    <Button
                        type="button"
                        theme="primary"
                        variant="contained"
                        size="large"
                        label="Create a new account"
                        fullWidth={true}
                        onClick={signupHandler}
                    />
                </div>
            </div>
        </Loader>
    );
};
