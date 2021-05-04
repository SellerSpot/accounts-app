import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Form } from 'react-final-form';
import { Button, showNotify } from '@sellerspot/universal-components';

import { ROUTES } from 'config/routes';
import { PasswordField } from './components/Fields';
import ResetPasswordServie from './ResetPassword.service';
import commonStyles from '../../styles/common.module.scss';
import { IResetPasswordFormValues, IResetPasswordParams } from './ResetPassword.types';
import { Loader } from 'components/Loader/Loader';
import ResetPasswordService from './ResetPassword.service';
import { IStoreDetails } from 'typings/temp.types';

export const ResetPassword = (): ReactElement => {
    const history = useHistory();
    const params = useParams<IResetPasswordParams>();
    const [isLoading, setIsLoading] = useState(true);
    const [, setResetToken] = useState('');
    const [storeDetail, setStoreDetail] = useState<IStoreDetails>({
        domainName: '',
        storeName: '',
        id: '',
    });

    // effects
    useEffect(() => {
        const resetPasswordValidationResult = ResetPasswordService.validateResetToken(params.token);
        if (resetPasswordValidationResult) {
            setResetToken(resetPasswordValidationResult.resetToken);
            setStoreDetail(resetPasswordValidationResult.storeDetails);
            setIsLoading(false);
        } else {
            // show notification - for invalid store
            showNotify('Invalid store or token, Please check store url and try again!');
            cachedSignInHandler();
        }
    }, []);

    // handlers
    const rememberPasswordHandler = () => history.push(ROUTES.SIGN_IN, storeDetail);
    const cachedSignInHandler = () => history.push(ROUTES.CACHED_SIGN_IN);

    const submitionHandler = (values: IResetPasswordFormValues) =>
        ResetPasswordServie.submitionHandler(values);

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Reset Password</h4>
                <h5 className={commonStyles.storeTitle}>{storeDetail.storeName}</h5>
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
                    {({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={handleSubmit}
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
                                disabled={submitting}
                            />
                        </form>
                    )}
                </Form>
            </div>
        </Loader>
    );
};
