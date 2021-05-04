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
import { IStoreDetails } from 'typings/temp.types';

export const SignIn = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [storeDetail, setStoreDetail] = useState<IStoreDetails>({
        domainName: '',
        storeName: '',
        id: '',
    });
    const location = useLocation<IStoreDetails>();

    // effects
    useEffect(() => {
        if (SignInService.checkHasValidStoreDetail(location.state)) {
            setStoreDetail(location.state);
            setIsLoading(false);
        } else {
            // show notification - for invalid store
            showNotify('Invalid store, Please check store url!');
            CachedSignInHandler();
        }
    }, []);

    // handlers
    const CachedSignInHandler = () => history.push(ROUTES.CACHED_SIGN_IN);

    const forgotPasswordHandler = () => history.push(ROUTES.FORGOT_PASSWORD, storeDetail);

    const submitionHandler = (values: ISignInFormValues) => SignInService.submitionHandler(values);

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
                <h5 className={commonStyles.storeTitle}>{storeDetail.domainName}</h5>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={CachedSignInHandler}
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
