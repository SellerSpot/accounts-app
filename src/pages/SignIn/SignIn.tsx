import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';

import { Button } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { EmailAddressField, PasswordField } from './components/Fields';
import SignInService from './SignIn.service';

import commonStyles from '../../styles/common.module.scss';
import { ISignInFormValues } from './SignIn.types';

export const SignIn = (): ReactElement => {
    const history = useHistory();

    const signupHandler = () => history.push(ROUTES.SIGN_UP);

    const forgotPasswordHandler = () => history.push(ROUTES.FORGOT_PASSWORD);

    const submitionHandler = (values: ISignInFormValues) => SignInService.submitionHandler(values);

    return (
        <div className={commonStyles.commonFormWithContentWrapper}>
            <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
            <h5 className={commonStyles.storeTitle}>Sreenithi Departmental Store</h5>
            <Button
                type="button"
                theme="primary"
                variant="text"
                size="small"
                onClick={signupHandler}
                label="Not your store?"
                className={{ wrapper: commonStyles.signInLink }}
            />
            <Form
                onSubmit={submitionHandler}
                initialValues={SignInService.initialFormValues}
                subscription={{}} // empty object overrides all subscriptions
            >
                {({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className={commonStyles.formWrapper} noValidate>
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
    );
};
