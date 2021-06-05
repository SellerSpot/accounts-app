import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Form } from 'react-final-form';
import { Button, showNotify, TFormSubmitionHandler } from '@sellerspot/universal-components';
import { IStoreDetails } from '@sellerspot/universal-types';

import { ROUTES } from 'config/routes';
import { EmailAddressField } from './components/Fields';
import ForgotPasswordService from './ForgotPassword.service';
import commonStyles from '../../styles/common.module.scss';
import { IForgotPasswordFormValues } from './ForgotPassword.types';
import { Loader } from 'components/Loader/Loader';
import SignInService from 'pages/SignIn/SignIn.service';

export const ForgotPassword = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [storeDetail, setStoreDetail] = useState<IStoreDetails>({
        domainDetails: {
            domainName: '',
            isCustomDomain: false,
            url: '',
        },
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
            cachedSignInHandler();
        }
    }, []);

    // handlers
    const rememberPasswordHandler = () => history.push(ROUTES.SIGN_IN, storeDetail);
    const cachedSignInHandler = () => history.push(ROUTES.CACHED_SIGN_IN);

    const submitionHandler = (values: IForgotPasswordFormValues) =>
        ForgotPasswordService.submitionHandler(values);

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Forgot Password?</h4>
                <h5 className={commonStyles.storeTitle}>{storeDetail.domainDetails.domainName}</h5>
                <h6 className={commonStyles.welcomeSubTitle}>
                    Store admin will only receive password reset mail, <br />
                    employees please contact admin.
                </h6>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={cachedSignInHandler}
                    label="Not your store?"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={ForgotPasswordService.initialFormValues}
                    subscription={{}} // empty object overrides all subscriptions
                >
                    {' '}
                    {({ handleSubmit, submitting, submitSucceeded }) => {
                        const validatedHandleSubmit: TFormSubmitionHandler = (e) => {
                            e.preventDefault();
                            if (!(submitting || submitSucceeded)) handleSubmit(e);
                        };
                        return (
                            <form
                                onSubmit={validatedHandleSubmit}
                                className={commonStyles.formWrapper}
                                noValidate
                            >
                                <EmailAddressField />
                                <Button
                                    type="button"
                                    theme="primary"
                                    variant="text"
                                    size="small"
                                    onClick={rememberPasswordHandler}
                                    label="Remember passsowrd?"
                                    className={{ wrapper: commonStyles.fogotPasswordLink }}
                                />
                                <Button
                                    type="submit"
                                    theme="primary"
                                    variant="contained"
                                    size="large"
                                    label="Send password reset mail"
                                    fullWidth={true}
                                    isLoading={submitting || submitSucceeded}
                                />
                            </form>
                        );
                    }}
                </Form>
            </div>
        </Loader>
    );
};
