import React, { ReactElement } from 'react';
import { Field } from 'react-final-form';

import { InputField } from '@sellerspot/universal-components';
import { sanitize } from 'utilities/sanitizer';

import { TOnChangeMiddleware } from 'typings/common.types';
import SignInService from '../SignIn.service';

export const EmailAddressField = (): ReactElement => {
    return (
        <Field
            name="email"
            validate={(value) => SignInService.validationHandler(value, 'email')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignInService.getStaticFieldProps(meta);
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
            validate={(value) => SignInService.validationHandler(value, 'password')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignInService.getStaticFieldProps(meta);
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
