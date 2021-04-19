import { Button, InputField } from '@sellerspot/universal-components';
import { CONFIG } from 'config/config';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import styles from './SignUp.module.scss';
import { Formik } from 'formik';

export const SignUp = (): ReactElement => {
    const history = useHistory();

    const signInHandler = () => {
        history.push(ROUTES.SIGN_IN);
    };

    const signUpFormOnSubmitHandler: React.FormEventHandler = (e) => {
        e.preventDefault();
        // do validation and submition
    };

    const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;

    return (
        <div className={styles.signUpWrapper}>
            <h4 className={styles.welcomeTitle}>Join our team of 10 million countrywide stores</h4>
            <h6 className={styles.welcomeSubTitle}>
                One more step to taking your business to the next level
            </h6>
            <Button
                type="button"
                theme="primary"
                variant="text"
                size="small"
                onClick={signInHandler}
                label="Already have an account? Signin instead"
                className={{ wrapper: styles.signInLink }}
            />
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={(_) => {
                    // do validation
                }}
                onSubmit={(_) => {
                    // do submition
                }}
            >
                {(
                    {
                        /* and other goodies */
                    },
                ) => (
                    <form onSubmit={signUpFormOnSubmitHandler} className={styles.formWrapper}>
                        <InputField
                            label="Your Name"
                            theme="primary"
                            type="text"
                            autoFocus={true}
                            fullWidth={true}
                            size="medium"
                        />
                        <InputField
                            label="Store Name"
                            theme="primary"
                            type="text"
                            autoFocus={true}
                            fullWidth={true}
                            size="medium"
                        />
                        <InputField
                            label="Store Url"
                            theme="primary"
                            type="text"
                            autoFocus={true}
                            fullWidth={true}
                            size="medium"
                            suffix={baseDomainSuffix}
                        />
                        <InputField
                            label="Email Address"
                            theme="primary"
                            type="text"
                            autoFocus={true}
                            fullWidth={true}
                            size="medium"
                        />
                        <InputField
                            label="Password"
                            theme="primary"
                            type="password"
                            autoFocus={true}
                            fullWidth={true}
                            size="medium"
                        />
                        <Button
                            type="submit"
                            theme="primary"
                            variant="contained"
                            size="large"
                            label="Signup for free!"
                            fullWidth={true}
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
};
