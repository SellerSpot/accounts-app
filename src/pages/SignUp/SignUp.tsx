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

export const SignUp = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    // effects
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // handlers
    const signInHandler = () => {
        history.push(ROUTES.SIGN_IN);
    };

    const submitionHandler: React.FormEventHandler = (values: React.FormEvent<Element>) =>
        SignUpService.submitionHandler(values);

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
                    onClick={signInHandler}
                    label="Already have an account? Signin instead"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={SignUpService.initialFormValues}
                    subscription={{}} // empty object overrides all subscriptions
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
                                label="Create your store for free"
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
