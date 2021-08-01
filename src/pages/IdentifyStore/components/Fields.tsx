import React, { ReactElement } from 'react';
import { Field } from 'react-final-form';

import { InputField } from '@sellerspot/universal-components';
import { sanitize } from 'utilities/sanitizer';

import IdentifyStoreServie from '../IdentifyStore.service';
import { CONFIG } from 'config/config';
import { TOnChangeMiddleware } from 'typings/common.types';

export const StoreUrlField = (): ReactElement => {
    return (
        <Field
            name="domainName"
            validate={async (value: string) => await IdentifyStoreServie.storeUrlValidator(value)}
            validateFields={[]}
        >
            {({ input, meta }) => {
                const { inputFieldTheme, helperMessage } =
                    IdentifyStoreServie.getStoreUrlFieldProps(input.value, meta);
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
                        autoFocus={true}
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
