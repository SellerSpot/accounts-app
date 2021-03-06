import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Form } from 'react-final-form';
import { Button, showNotify, TFormSubmitionHandler } from '@sellerspot/universal-components';
import { IStoreDetails } from '@sellerspot/universal-types';

import { ROUTES } from 'config/routes';
import { PasswordField } from './components/Fields';
import ResetPasswordServie from './ResetPassword.service';
import commonStyles from '../../styles/common.module.scss';
import { IResetPasswordFormValues, IResetPasswordParams } from './ResetPassword.types';
import { Loader } from 'components/Loader/Loader';
import ResetPasswordService from './ResetPassword.service';

export const ResetPassword = (): ReactElement => {
    const history = useHistory();
    const params = useParams<IResetPasswordParams>();
    const [isLoading, setIsLoading] = useState(true);
    const [, setResetToken] = useState('');
    const [storeDetails, setStoreDetails] = useState<IStoreDetails>(null);

    // effects
    useEffect(() => {
        const resetPasswordValidationResult = ResetPasswordService.validateResetToken(params.token);
        if (resetPasswordValidationResult) {
            setResetToken(resetPasswordValidationResult.resetToken);
            setStoreDetails(resetPasswordValidationResult.storeDetails);
            setIsLoading(false);
        } else {
            // show notification - for invalid store
            showNotify('Invalid store or token, Please check store url and try again!');
            cachedSignInHandler();
        }
    }, []);

    // handlers
    const rememberPasswordHandler = () => history.push(ROUTES.SIGN_IN, storeDetails);
    const cachedSignInHandler = () => history.push(ROUTES.CACHED_SIGN_IN);

    const submitionHandler = (values: IResetPasswordFormValues) =>
        ResetPasswordServie.submitionHandler(values);

    if (isLoading) return <Loader />;

    return (
        <div className={commonStyles.commonFormWithContentWrapper}>
            <h4 className={commonStyles.welcomeTitle}>Reset Password</h4>
            <h5 className={commonStyles.storeTitle}>{storeDetails.storeName}</h5>
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
                initialValues={ResetPasswordServie.initialFormValues}
                subscription={{}} // empty object overrides all subscriptions
            >
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
                            <PasswordField />
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
                                label="Reset password"
                                fullWidth={true}
                                isLoading={submitting || submitSucceeded}
                            />
                        </form>
                    );
                }}
            </Form>
        </div>
    );
};
