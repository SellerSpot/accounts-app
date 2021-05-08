import React, { ReactElement } from 'react';
import { Field } from 'react-final-form';

import { InputField } from '@sellerspot/universal-components';
import { sanitize } from 'utilities/sanitizer';

import { TOnChangeMiddleware } from 'typings/common.types';
import SignInService from '../SignIn.service';
import { IFieldProps } from 'pages/SignUp/SignUp.types';
import { ISignInFormValues } from '../SignIn.types';

export const EmailAddressField = (props: IFieldProps<ISignInFormValues>): ReactElement => {
    return (
        <Field
            name="email"
            validate={(value) => SignInService.validationHandler(value, 'email')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignInService.getStaticFieldProps(
                    input.name,
                    meta,
                    props.form,
                );
                return (
                    <InputField
                        {...input}
                        label="Email Address"
                        autoFocus={true}
                        type="text"
                        theme={theme}
                        size={'medium'}
                        fullWidth={true}
                        required={true}
                        disabled={meta.submitting}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};

export const PasswordField = (props: IFieldProps<ISignInFormValues>): ReactElement => {
    return (
        <Field
            name="password"
            validate={(value) => SignInService.validationHandler(value, 'password')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = SignInService.getStaticFieldProps(
                    input.name,
                    meta,
                    props.form,
                );
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
                        disabled={meta.submitting}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};
