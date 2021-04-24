import * as yup from 'yup';
import { introduceDelay } from 'utilities/general';
import { FieldMetaState } from 'react-final-form';
import { CONFIG } from 'config/config';
import { IInputFieldProps } from '@sellerspot/universal-components';
import { ISignupFormValues } from './SignUp.types';

export default class SignUpService {
    static initialFormValues: ISignupFormValues = {
        name: '',
        storeName: '',
        storeUrl: '',
        email: '',
        password: '',
    };

    static submitionHandler = async (values: React.FormEvent<Element>): Promise<void> => {
        // submition logic goes here
        console.log(values);
    };

    static storeUrlAvailabilityCheckHandler = async (value: string): Promise<string> => {
        try {
            const fieldPath: keyof ISignupFormValues = 'storeUrl';
            // get schema instance for the required field
            const requiredSchema: yup.SchemaOf<ISignupFormValues['storeUrl']> = yup.reach(
                SignUpService.validationSchema,
                fieldPath,
            );
            requiredSchema.validateSync(value, { abortEarly: true });
            // do api validation here
            await introduceDelay(1000);
            // axios.get('url?domain=${value}')
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            // uncaught error
            return 'NOT_AVAILABLE'; // which will be caught in ui layer and will be displayed as domain not availble
        }
    };

    static validationHandler = (value: string, fieldPath: keyof ISignupFormValues): string => {
        const requiredSchema: yup.SchemaOf<ISignupFormValues[typeof fieldPath]> = yup.reach(
            SignUpService.validationSchema,
            fieldPath,
        );
        try {
            requiredSchema.validateSync(value, { abortEarly: true });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            // uncaught error
            return error;
        }
    };

    // validate schema
    private static validationSchema: yup.SchemaOf<ISignupFormValues> = yup.object().shape({
        name: yup
            .string()
            .required('Name is required')
            .min(3, 'Name should not be less than 3 characters')
            .max(15, 'Store name should not be more than 15 characters'),
        storeName: yup
            .string()
            .required('Store name is required')
            .min(3, 'Store name should not be less than 3 characters')
            .max(15, 'Store name should not be more than 15 characters'),
        storeUrl: yup
            .string()
            .required('Store url is required')
            .min(3, 'Store url should be more than 3 characters')
            .max(15, 'Store url should not be more than 15 characters'),
        password: yup
            .string()
            .required('Password is required')
            .min(3, 'Password length should be more than 3'),
        email: yup.string().required('Email is required').email('Invalid email id'),
    });

    static getStoreUrlFieldProps = (
        value: string,
        { error, validating, valid, touched, visited }: FieldMetaState<string>,
    ): {
        helperMessage: IInputFieldProps['helperMessage'];
        inputFieldTheme: IInputFieldProps['theme'];
    } => {
        const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;
        let helperTextType: IInputFieldProps['helperMessage']['type'] = 'none';
        let helperTextContent: string = error;
        let inputFieldTheme: IInputFieldProps['theme'] = 'primary';
        const helperMessageEnabled = (error || validating || valid) && (touched || visited);
        if (helperMessageEnabled)
            if (validating) {
                helperTextType = 'loading';
                helperTextContent = 'Checking for availability';
            } else if (valid) {
                helperTextType = 'success';
                inputFieldTheme = 'success';
                helperTextContent = `${value}${baseDomainSuffix} is available.`;
            } else if (error) {
                // error
                helperTextType = 'error';
                inputFieldTheme = 'danger';
                helperTextContent =
                    error === 'NOT_AVAILABLE'
                        ? `${value}${baseDomainSuffix} is not available.`
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

    static getStaticFieldProps = ({
        error,
        touched,
    }: FieldMetaState<string>): {
        helperMessage: IInputFieldProps['helperMessage'];
        theme: IInputFieldProps['theme'];
    } => {
        const hasError = error && touched;
        const helperMessage: IInputFieldProps['helperMessage'] = {
            enabled: hasError,
            type: 'error',
            content: error,
        };
        const theme: IInputFieldProps['theme'] = hasError ? 'danger' : 'primary';

        return { helperMessage, theme };
    };
}
