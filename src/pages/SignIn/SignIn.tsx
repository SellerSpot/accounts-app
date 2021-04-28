import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Form } from 'react-final-form';

import { Button, showNotify } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { EmailAddressField, PasswordField } from './components/Fields';
import SignInService from './SignIn.service';

import commonStyles from '../../styles/common.module.scss';
import { ISignInFormValues } from './SignIn.types';
import { Loader } from 'components/Loader/Loader';
import { IStoreDetail } from 'pages/CachedSignIn/CachedSignIn.types';

export const SignIn = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [storeDetail, setStoreDetail] = useState<IStoreDetail>({ domain: '', name: '', id: '' });
    const location = useLocation<IStoreDetail>();

    // effects
    useEffect(() => {
        if (SignInService.checkHasValidStoreDetail(location.state)) {
            setStoreDetail(location.state);
            setIsLoading(false);
        } else {
            // show notification - for invalid store
            showNotify('Invalid store, Please check store url!');
            identifyStoreHandler();
        }
    }, []);

    // handlers
    const identifyStoreHandler = () => history.push(ROUTES.IDENTIFY_STORE);

    const forgotPasswordHandler = () => history.push(ROUTES.FORGOT_PASSWORD);

    const submitionHandler = (values: ISignInFormValues) => SignInService.submitionHandler(values);

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
                <h5 className={commonStyles.storeTitle}>{storeDetail.name}</h5>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={identifyStoreHandler}
                    label="Not your store?"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={SignInService.initialFormValues}
                    subscription={{}} // empty object overrides all subscriptions
                >
                    {({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            className={commonStyles.formWrapper}
                            noValidate
                        >
                            <EmailAddressField />
                            <PasswordField />
                            <Button
                                type="button"
                                theme="primary"
                                variant="text"
                                size="small"
                                onClick={forgotPasswordHandler}
                                label="Forgot Password?"
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
