import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '@sellerspot/universal-components';
import { IStoreDetails } from '@sellerspot/universal-types';

import { ROUTES } from 'config/routes';
import CachedSignInService from './CachedSignIn.service';

import cachedSignInStyles from './CachedSignIn.module.scss';
import commonStyles from '../../styles/common.module.scss';
import { Loader } from 'components/Loader/Loader';
import SignInService from 'pages/SignIn/SignIn.service';

export const CachedSignIn = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [stores, setStores] = useState<IStoreDetails[]>([]);

    const flllSignedInState = async () => {
        const signedInStores = CachedSignInService.getAllCachedStores();
        const validStores = signedInStores.filter((signedInStore) =>
            SignInService.checkHasValidStoreDetail(signedInStore),
        );
        if (validStores.length) {
            setStores(validStores);
            setIsLoading(false);
        } else {
            history.push(ROUTES.IDENTIFY_STORE);
        }
    };

    // effects
    useEffect(() => {
        flllSignedInState();
    }, []);

    const signInWithDifferentAccountHandler = () => history.push(ROUTES.IDENTIFY_STORE);
    const signupHandler = () => history.push(ROUTES.SIGN_UP);
    const signInWithHandler = (key: number) => {
        // do signin rediretion with state
        const store = stores[key];
        history.push(ROUTES.SIGN_IN, store);
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
                            label={
                                <div className={cachedSignInStyles.customButton}>
                                    <h5 className={cachedSignInStyles.storeName}>
                                        {store.storeName}
                                    </h5>
                                    <h6 className={cachedSignInStyles.domainName}>
                                        {store.domainDetails.domainName}
                                    </h6>
                                </div>
                            }
                            fullWidth={true}
                            onClick={() => signInWithHandler(key)}
                        />
                    ))}
                    <Button
                        type="button"
                        theme="primary"
                        variant="contained"
                        size="large"
                        label={'Signin to a different store'}
                        fullWidth={true}
                        onClick={signInWithDifferentAccountHandler}
                    />
                    <h6 className={commonStyles.separatorText}>or</h6>
                    <Button
                        type="button"
                        theme="primary"
                        variant="contained"
                        size="large"
                        label={'Create a new store'}
                        fullWidth={true}
                        onClick={signupHandler}
                    />
                </div>
            </div>
        </Loader>
    );
};
