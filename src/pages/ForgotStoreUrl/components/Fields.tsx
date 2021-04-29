import React, { ReactElement } from 'react';
import { Field } from 'react-final-form';

import { InputField } from '@sellerspot/universal-components';

import ForgotStoreUrlService from '../ForgotStoreUrl.service';

export const EmailAddressField = (): ReactElement => {
    return (
        <Field
            name="email"
            validate={(value) => ForgotStoreUrlService.validationHandler(value, 'email')}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { helperMessage, theme } = ForgotStoreUrlService.getStaticFieldProps(meta);
                return (
                    <InputField
                        {...input}
                        label="Email Address"
                        type="text"
                        theme={theme}
                        size={'medium'}
                        fullWidth={true}
                        required={true}
                        autoFocus={true}
                        helperMessage={helperMessage}
                        name={undefined} // to disable auto complete feature
                        disableAutoComplete={true}
                    />
                );
            }}
        </Field>
    );
};
