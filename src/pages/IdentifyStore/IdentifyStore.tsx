import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';

import { Button } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { StoreUrlField } from './components/Fields';
import IdentifyStoreService from './IdentifyStore.service';

import commonStyles from '../../styles/common.module.scss';
import { IIdentifyStoreFormValues } from './IdentifyStore.types';
import { Loader } from 'components/Loader/Loader';

export const IdentifyStore = (): ReactElement => {
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    // effects
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // handlers
    const signupHandler = () => {
        history.push(ROUTES.SIGN_UP);
    };

    const forgotStoreUrlHanlder = () => {
        history.push(ROUTES.FORGOT_STORE_URL);
    };

    const submitionHandler = (values: IIdentifyStoreFormValues) =>
        IdentifyStoreService.submitionHandler(values, history);

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={signupHandler}
                    label="Don't have an account? Sign Up"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={IdentifyStoreService.initialFormValues}
                    subscription={{}} // empty object overrides all subscriptions
                >
                    {({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            className={commonStyles.formWrapper}
                            noValidate
                        >
                            <StoreUrlField />
                            <Button
                                type="button"
                                theme="primary"
                                variant="text"
                                size="small"
                                onClick={forgotStoreUrlHanlder}
                                label="Forgot Store URL?"
                                className={{ wrapper: commonStyles.fogotPasswordLink }}
                            />
                            <Button
                                type="submit"
                                theme="primary"
                                variant="contained"
                                size="large"
                                label="Login to your store"
                                fullWidth={true}
                                disabled={submitting}
                            />
                        </form>
                    )}
                </Form>
            </div>
        </Loader>
    );
};
