import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';

import { Button } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import {
    EmailAddressField,
    NameField,
    PasswordField,
    StoreNameField,
    StoreUrlField,
} from './components/Fields';
import SignUpService from './Singup.service';

import commonStyles from '../../styles/common.module.scss';
import { Loader } from 'components/Loader/Loader';
import { ISignupFormValues } from './SignUp.types';

export const SignUp = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    // effects
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // handlers
    const cachedSignInHandler = () => {
        history.push(ROUTES.CACHED_SIGN_IN);
    };

    const submitionHandler = async (values: ISignupFormValues) => {
        const resposne = await SignUpService.submitionHandler(values);
        console.log(resposne);
        return resposne;
    };

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>
                    Join our team of 10 million countrywide stores
                </h4>
                <h6 className={commonStyles.welcomeSubTitle}>
                    One more step to taking your business to the next level
                </h6>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={cachedSignInHandler}
                    label="Already have an account? Signin instead"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={SignUpService.initialFormValues}
                    subscription={{ submitting: true, submitError: true, submitErrors: true }} // empty object overrides all subscriptions
                >
                    {({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            className={commonStyles.formWrapper}
                            noValidate
                        >
                            <NameField />
                            <StoreNameField />
                            <StoreUrlField />
                            <EmailAddressField />
                            <PasswordField />
                            <Button
                                type="submit"
                                theme="primary"
                                variant="contained"
                                size="large"
                                fullWidth={true}
                                label={
                                    submitting
                                        ? 'Please wait, Creating your account...'
                                        : 'Create your store for free'
                                }
                                disabled={submitting}
                            />
                        </form>
                    )}
                </Form>
            </div>
        </Loader>
    );
};
