import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { Form, Field } from 'react-final-form';

import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import { CONFIG } from 'config/config';
import { ROUTES } from 'config/routes';
import styles from './SignUp.module.scss';
import SignUpService from './Singup.service';
import { ISignupFormValues } from './SignUp.types';

export const SignUp = (): ReactElement => {
    const history = useHistory();

    const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;

    const signInHandler = () => {
        history.push(ROUTES.SIGN_IN);
    };

    const submitionHandler: React.FormEventHandler = (values: React.FormEvent<Element>) =>
        SignUpService.submitionHandler(values);

    const validationHandler = (values: React.FormEvent<Element>) =>
        SignUpService.validationHandler(values);

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
            <Form
                onSubmit={submitionHandler}
                initialValues={SignUpService.initialFormValues}
                validate={validationHandler}
            >
                {({ handleSubmit, submitting, form }) => (
                    <form onSubmit={handleSubmit} className={styles.formWrapper} noValidate>
                        <Field name="name">
                            {({ input, meta: { error, touched } }) => {
                                const hasError = error && touched;
                                const helperMessage: IInputFieldProps['helperMessage'] = {
                                    enabled: hasError,
                                    type: 'error',
                                    content: error,
                                };
                                const theme: IInputFieldProps['theme'] = hasError
                                    ? 'danger'
                                    : 'primary';
                                return (
                                    <InputField
                                        {...(input as unknown)}
                                        label="Your Name"
                                        autoFocus={true}
                                        type="text"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                        {...(input as unknown)}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="storeName">
                            {({ input, meta: { error, touched } }) => {
                                const hasError = error && touched;
                                const helperMessage: IInputFieldProps['helperMessage'] = {
                                    enabled: hasError,
                                    type: 'error',
                                    content: error,
                                };
                                const theme: IInputFieldProps['theme'] = hasError
                                    ? 'danger'
                                    : 'primary';
                                return (
                                    <InputField
                                        label="Store Name"
                                        type="text"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                        {...(input as unknown)}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="storeUrl">
                            {({ input, meta: { error, touched } }) => {
                                const hasError = error && touched;
                                const helperMessage: IInputFieldProps['helperMessage'] = {
                                    enabled: hasError,
                                    type: 'error',
                                    content: error,
                                };
                                const theme: IInputFieldProps['theme'] = hasError
                                    ? 'danger'
                                    : 'primary';
                                return (
                                    <InputField
                                        label="Store Url"
                                        type="text"
                                        suffix={baseDomainSuffix}
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                        {...(input as unknown)}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="email">
                            {({ input, meta: { error, touched } }) => {
                                const hasError = error && touched;
                                const helperMessage: IInputFieldProps['helperMessage'] = {
                                    enabled: hasError,
                                    type: 'error',
                                    content: error,
                                };
                                const theme: IInputFieldProps['theme'] = hasError
                                    ? 'danger'
                                    : 'primary';
                                return (
                                    <InputField
                                        label="Email Address"
                                        type="text"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                        {...(input as unknown)}
                                    />
                                );
                            }}
                        </Field>
                        <Field name="password">
                            {({ input, meta: { error, touched } }) => {
                                const hasError = error && touched;
                                const helperMessage: IInputFieldProps['helperMessage'] = {
                                    enabled: hasError,
                                    type: 'error',
                                    content: error,
                                };
                                const theme: IInputFieldProps['theme'] = hasError
                                    ? 'danger'
                                    : 'primary';
                                return (
                                    <InputField
                                        label="Password"
                                        type="password"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                        {...(input as unknown)}
                                    />
                                );
                            }}
                        </Field>
                        <Button
                            type="submit"
                            theme="primary"
                            variant="contained"
                            size="large"
                            label="Create your store for free !"
                            fullWidth={true}
                            disabled={submitting}
                        />
                    </form>
                )}
            </Form>
        </div>
    );
};
