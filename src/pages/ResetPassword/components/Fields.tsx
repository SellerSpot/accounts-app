import React, { ReactElement } from 'react';
import { Field } from 'react-final-form';

import { InputField } from '@sellerspot/universal-components';

import ResetPasswordService from '../ResetPassword.service';
import { TOnChangeMiddleware } from 'typings/common.types';
import { sanitize } from 'utilities/sanitizer';

export const PasswordField = (): ReactElement => {
    return (
        <Field
            name="password"
            validate={(value) => ResetPasswordService.validationHandler(value, 'password')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = ResetPasswordService.getStaticFieldProps(meta);
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
                        autoFocus={true}
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
