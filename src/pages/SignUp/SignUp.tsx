import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { CONFIG } from 'config/config';
import { ROUTES } from 'config/routes';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import styles from './SignUp.module.scss';
import { useFormik } from 'formik';

export const SignUp = (): ReactElement => {
    const history = useHistory();

    const signInHandler = () => {
        history.push(ROUTES.SIGN_IN);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            storeName: '',
            storeUrl: '',
            email: '',
            password: '',
        },
        onSubmit: (_) => {
            // handle submition
        },
    });

    const signUpFormOnSubmitHandler: React.FormEventHandler = (e) => {
        e.preventDefault();
        // do validation and submition
    };

    const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;

    const getInputFieldCommonProps = (
        fieldName: keyof typeof formik.values,
    ): Partial<IInputFieldProps> => {
        const hasError = !!formik.errors[fieldName];
        const theme = hasError ? 'danger' : 'primary';
        return {
            theme,
            fullWidth: true,
            size: 'medium',
            onChange: formik.handleChange,
            value: formik.values[fieldName],
            helperMessage: {
                enabled: hasError,
                type: 'error',
                content: formik.errors[fieldName],
            },
            id: fieldName,
            name: fieldName,
        };
    };

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
            <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
                <InputField
                    label="Your Name"
                    type="text"
                    autoFocus={true}
                    required={true}
                    theme={'primary'}
                    fullWidth={true}
                    size={'medium'}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    helperMessage={{
                        enabled: !!formik.errors.name,
                        type: 'error',
                        content: formik.errors.name,
                    }}
                    id="name"
                    name="name"
                />
                <InputField
                    label="Store Name"
                    type="text"
                    theme={!!formik.errors.storeName ? 'danger' : 'primary'}
                    {...getInputFieldCommonProps('storeName')}
                />
                <InputField
                    label="Store Url"
                    type="text"
                    suffix={baseDomainSuffix}
                    theme={!!formik.errors.storeUrl ? 'danger' : 'primary'}
                    {...getInputFieldCommonProps('storeUrl')}
                />
                <InputField
                    label="Email Address"
                    type="text"
                    theme={!!formik.errors.email ? 'danger' : 'primary'}
                    {...getInputFieldCommonProps('email')}
                />
                <InputField
                    label="Password"
                    type="password"
                    theme={!!formik.errors.email ? 'danger' : 'primary'}
                    {...getInputFieldCommonProps('password')}
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
        </div>
    );
};
