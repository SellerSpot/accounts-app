import * as yup from 'yup';
import { introduceDelay } from 'utilities/general';
import { FieldMetaState } from 'react-final-form';
import { CONFIG } from 'config/config';
import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { ISignupFormValues } from './SignUp.types';
import { authRequest } from 'requests/requests';

export default class SignUpService {
    static initialFormValues: ISignupFormValues = {
        name: '',
        storeName: '',
        domainName: '',
        email: '',
        password: '',
    };

    static submitionHandler = async (values: ISignupFormValues): Promise<unknown> => {
        const { name, storeName, email, password, domainName } = values;
        // submition logic goes here
        const response = await authRequest.signupTenant({
            name,
            storeName,
            email,
            password,
            domainName,
        });
        if (response.status) {
            // authenticate user and redirect to the retrived domain
            console.log('success', values);
        } else {
            showNotify(response.error.message);
            const error: { [key: string]: string } = {};
            response.error.errors?.forEach((err) => {
                error[err.name] = err.message;
            });
            return error;
        }
    };

    static storeUrlAvailabilityCheckHandler = async (value: string): Promise<string> => {
        try {
            const fieldPath: keyof ISignupFormValues = 'domainName';
            // get schema instance for the required field
            const requiredSchema: yup.SchemaOf<ISignupFormValues['domainName']> = yup.reach(
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
        domainName: yup
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
        { error, validating, valid, touched, visited, submitError }: FieldMetaState<string>,
    ): {
        helperMessage: IInputFieldProps['helperMessage'];
        inputFieldTheme: IInputFieldProps['theme'];
    } => {
        debugger;
        const baseDomainSuffix = `.${CONFIG.BASE_DOMAIN_NAME}`;
        let helperTextType: IInputFieldProps['helperMessage']['type'] = 'none';
        let helperTextContent: string = error || submitError;
        let inputFieldTheme: IInputFieldProps['theme'] = 'primary';
        const helperMessageEnabled =
            (error || validating || valid || submitError) && (touched || visited);
        if (helperMessageEnabled)
            if (validating) {
                helperTextType = 'loading';
                helperTextContent = 'Checking for availability';
            } else if (valid) {
                helperTextType = 'success';
                inputFieldTheme = 'success';
                helperTextContent = `${value}${baseDomainSuffix} is available.`;
            } else if (error || submitError) {
                // error
                helperTextType = 'error';
                inputFieldTheme = 'danger';
                helperTextContent =
                    error === 'NOT_AVAILABLE'
                        ? `${value}${baseDomainSuffix} is not available.`
                        : error || submitError;
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
        submitError,
    }: FieldMetaState<string>): {
        helperMessage: IInputFieldProps['helperMessage'];
        theme: IInputFieldProps['theme'];
    } => {
        const hasError = (error || submitError) && touched;
        const helperMessage: IInputFieldProps['helperMessage'] = {
            enabled: hasError,
            type: 'error',
            content: error || submitError,
        };
        const theme: IInputFieldProps['theme'] = hasError ? 'danger' : 'primary';

        return { helperMessage, theme };
    };
}
