import { sanitize } from 'utilities/sanitizer';
import { useHistory } from 'react-router';
import { Form, Field } from 'react-final-form';
import React, { ReactElement } from 'react';
import { ROUTES } from 'config/routes';
import { CONFIG } from 'config/config';
import { Button, InputField } from '@sellerspot/universal-components';
import SignUpService from './Singup.service';
import { TOnChangeMiddleware } from './SignUp.types';
import styles from './SignUp.module.scss';

const NameField = (): ReactElement => {
    return (
        <Field
            name="name"
            validate={(value) => SignUpService.validationHandler(value, 'name')}
            validateFields={[]} // to disable unnecessary triggering of validation in other fields
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignUpService.getStaticFieldProps(meta);
                const onChangeMiddleWare: TOnChangeMiddleware = (e) => {
                    e.target.value = sanitize('onlyAllowAlphabets', e.target.value);
                    input.onChange(e);
                };
                return (
                    <InputField
                        {...input}
                        onChange={onChangeMiddleWare}
                        label="Your Name"
                        autoFocus={true}
                        type="text"
                        theme={theme}
                        size={'medium'}
                        fullWidth={true}
                        required={true}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

const StoreNameField = (): ReactElement => {
    return (
        <Field
            name="storeName"
            validate={(value) => SignUpService.validationHandler(value, 'storeName')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignUpService.getStaticFieldProps(meta);
                const onChangeMiddleWare: TOnChangeMiddleware = (e) => {
                    e.target.value = sanitize('onlyAllowAlphaNumeric', e.target.value);
                    input.onChange(e);
                };
                return (
                    <InputField
                        {...input}
                        onChange={onChangeMiddleWare}
                        label="Store Name"
                        type="text"
                        theme={theme}
                        size={'medium'}
                        fullWidth={true}
                        required={true}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

const StoreUrlField = (): ReactElement => {
    return (
        <Field
            name="storeUrl"
            validate={async (value: string) =>
                await SignUpService.storeUrlAvailabilityCheckHandler(value)
            }
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { inputFieldTheme, helperMessage } = SignUpService.getStoreUrlFieldProps(
                    input.value,
                    meta,
                );
                const onChangeMiddleWare: TOnChangeMiddleware = (e) => {
                    e.target.value = sanitize('onlyAllowAlphaNumeric', e.target.value);
                    input.onChange(e);
                };
                return (
                    <InputField
                        {...input}
                        onChange={onChangeMiddleWare}
                        label="Store Url"
                        type="text"
                        direction="rtl"
                        suffix={`.${CONFIG.BASE_DOMAIN_NAME}`}
                        theme={inputFieldTheme}
                        size={'medium'}
                        fullWidth={true}
                        required={true}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

const EmailAddressField = (): ReactElement => {
    return (
        <Field
            name="email"
            validate={(value) => SignUpService.validationHandler(value, 'email')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignUpService.getStaticFieldProps(meta);
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
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

const PasswordField = (): ReactElement => {
    return (
        <Field
            name="password"
            validate={(value) => SignUpService.validationHandler(value, 'password')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignUpService.getStaticFieldProps(meta);
                const onChangeMiddleWare: TOnChangeMiddleware = (e) => {
                    e.target.value = sanitize('removeAllSpaces', e.target.value);
                    input.onChange(e);
                };
                return (
                    <InputField
                        {...input}
                        onChange={onChangeMiddleWare}
                        label="Password"
                        type="password"
                        theme={theme}
                        size={'medium'}
                        fullWidth={true}
                        required={true}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

export const SignUp = (): ReactElement => {
    const history = useHistory();

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
