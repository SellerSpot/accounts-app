import React, { ReactElement } from 'react';
import { Field } from 'react-final-form';

import { InputField } from '@sellerspot/universal-components';
import { sanitize } from 'utilities/sanitizer';
import { CONFIG } from 'config/config';

import SignUpService from '../Singup.service';
import { TOnChangeMiddleware } from 'typings/common.types';

export const NameField = (): ReactElement => {
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

export const StoreNameField = (): ReactElement => {
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

export const StoreUrlField = (): ReactElement => {
    return (
        <Field
            name="domainName"
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

export const EmailAddressField = (): ReactElement => {
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

export const PasswordField = (): ReactElement => {
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
