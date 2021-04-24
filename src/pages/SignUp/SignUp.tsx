import { useHistory } from 'react-router';
import { Form, Field } from 'react-final-form';
import React, { ReactElement } from 'react';
import { ROUTES } from 'config/routes';
import { CONFIG } from 'config/config';
import { Button, IInputFieldProps, InputField } from '@sellerspot/universal-components';
import SignUpService from './Singup.service';
import styles from './SignUp.module.scss';

export const SignUp = (): ReactElement => {
    const history = useHistory();

    const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;

    const signInHandler = () => {
        history.push(ROUTES.SIGN_IN);
    };

    const submitionHandler: React.FormEventHandler = (values: React.FormEvent<Element>) =>
        SignUpService.submitionHandler(values);

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
                subscription={{}} // empty object overrides all subscriptions
            >
                {({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className={styles.formWrapper} noValidate>
                        <Field
                            name="name"
                            validate={(value) => SignUpService.validationHandler(value, 'name')}
                        >
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
                                        {...input}
                                        label="Your Name"
                                        autoFocus={true}
                                        type="text"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                    />
                                );
                            }}
                        </Field>
                        <Field
                            name="storeName"
                            validate={(value) => SignUpService.validationHandler(value, 'name')}
                        >
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
                                        {...input}
                                        label="Store Name"
                                        type="text"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                    />
                                );
                            }}
                        </Field>
                        <Field
                            name="storeUrl"
                            validate={(value) =>
                                SignUpService.asyncValidationHandler(value, 'storeUrl')
                            }
                        >
                            {({ input, meta: { error, touched, validating } }) => {
                                const helperTextType: IInputFieldProps['helperMessage']['type'] = validating
                                    ? 'loading'
                                    : 'error';

                                let helperTextContent: string = error;
                                if (validating) {
                                    helperTextContent = 'Checking Url Status';
                                }
                                const helperMessageEnabled = (error || validating) && touched;
                                const helperMessage: IInputFieldProps['helperMessage'] = {
                                    enabled: helperMessageEnabled,
                                    type: helperTextType,
                                    content: helperTextContent,
                                };
                                const inputFieldTheme: IInputFieldProps['theme'] =
                                    helperTextType === 'error' && helperMessageEnabled
                                        ? 'danger'
                                        : 'primary';
                                return (
                                    <InputField
                                        {...input}
                                        label="Store Url"
                                        type="text"
                                        direction="rtl"
                                        suffix={baseDomainSuffix}
                                        theme={inputFieldTheme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                    />
                                );
                            }}
                        </Field>
                        <Field
                            name="email"
                            validate={(value) => SignUpService.validationHandler(value, 'email')}
                        >
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
                                        {...input}
                                        label="Email Address"
                                        type="text"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
                                    />
                                );
                            }}
                        </Field>
                        <Field
                            name="password"
                            validate={(value) => SignUpService.validationHandler(value, 'password')}
                        >
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
                                        {...input}
                                        label="Password"
                                        type="password"
                                        theme={theme}
                                        size={'medium'}
                                        fullWidth={true}
                                        required={true}
                                        helperMessage={helperMessage}
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
