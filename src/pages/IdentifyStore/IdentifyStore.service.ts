import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';

import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { CONFIG } from 'config/config';

import { IIdentifyStoreFormValues } from './IdentifyStore.types';
import { authRequest } from 'requests/requests';
import { useHistory } from 'react-router';
import { ROUTES } from 'config/routes';

export default class IdentifyStoreService {
    static initialFormValues: IIdentifyStoreFormValues = {
        domainName: '',
    };

    static submitionHandler = async (
        values: IIdentifyStoreFormValues,
        history: ReturnType<typeof useHistory>,
    ): Promise<unknown> => {
        // submition logic goes here
        debugger;
        const { status, data, error } = await authRequest.identifyStore(values.domainName);
        if (status) {
            const { store } = data;
            history.push(ROUTES.SIGN_IN, store);
        } else {
            const resultError: { [key in keyof Partial<IIdentifyStoreFormValues>]: string } = {};
            if (error?.message) {
                showNotify(error.message);
            }
            resultError[
                'domainName'
            ] = `${values.domainName}.${CONFIG.BASE_DOMAIN_NAME} is not a valid domain!`;

            return resultError;
        }
    };

    static storeUrlValidator = async (value: string): Promise<string> => {
        try {
            const fieldPath: keyof IIdentifyStoreFormValues = 'domainName';
            // get schema instance for the required field
            const requiredSchema: yup.SchemaOf<IIdentifyStoreFormValues['domainName']> = yup.reach(
                IdentifyStoreService.validationSchema,
                fieldPath,
            );
            requiredSchema.validateSync(value, { abortEarly: true });
            // do api validation here
            const response = await authRequest.checkIsValidDomain(value);
            if (!response?.status) {
                throw new Error('NOT_AVAILABLE');
            }
            // axios.get('url?domain=${value}')
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            // uncaught error
            return 'NOT_AVAILABLE'; // which will be caught in ui layer and will be displayed as domain not availble
        }
    };

    static getStoreUrlFieldProps = (
        value: string,
        { error, validating, valid, touched, visited, modified }: FieldMetaState<string>,
    ): {
        helperMessage: IInputFieldProps['helperMessage'];
        inputFieldTheme: IInputFieldProps['theme'];
    } => {
        const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;
        let helperTextType: IInputFieldProps['helperMessage']['type'] = 'none';
        let helperTextContent: string = error;
        let inputFieldTheme: IInputFieldProps['theme'] = 'primary';
        const helperMessageEnabled =
            (error || validating || valid) && (touched || visited || modified);
        if (helperMessageEnabled)
            if (validating) {
                helperTextType = 'loading';
                helperTextContent = 'Validating store url';
            } else if (valid) {
                helperTextType = 'success';
                inputFieldTheme = 'success';
                helperTextContent = `Verified.`;
            } else if (error) {
                // error
                helperTextType = 'error';
                inputFieldTheme = 'danger';
                helperTextContent =
                    error === 'NOT_AVAILABLE'
                        ? `${value}${baseDomainSuffix} is not a valid domain.`
                        : error;
            }
        const helperMessage: IInputFieldProps['helperMessage'] = {
            enabled: helperMessageEnabled,
            type: helperTextType,
            content: helperTextContent,
        };

        return {
            helperMessage,
            inputFieldTheme,
        };
    };

    private static validationSchema: yup.SchemaOf<IIdentifyStoreFormValues> = yup.object().shape({
        domainName: yup
            .string()
            .required('Store url is required')
            .min(3, 'NOT_AVAILABLE')
            .max(15, 'NOT_AVAILABLE'),
    });
}
