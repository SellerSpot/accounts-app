import * as yup from 'yup';
import { introduceDelay } from 'utilities/general';
import { FieldMetaState } from 'react-final-form';
import { CONFIG } from 'config/config';
import { ISignupTenantResponse, ERROR_CODE } from '@sellerspot/universal-types';
import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { ISignupFormValues } from './SignUp.types';
import { authRequest } from 'requests/requests';
import { useHistory } from 'react-router';
import { ROUTES } from 'config/routes';
import { FormApi } from 'final-form';

export default class SignUpService {
    static initialFormValues: ISignupFormValues = {
        name: '',
        storeName: '',
        domainName: '',
        email: '',
        password: '',
    };

    static submitionHandler = async (
        values: ISignupFormValues,
        history: ReturnType<typeof useHistory>,
    ): Promise<unknown> => {
        const { name, storeName, email, password, domainName } = values;
        // submition logic goes here
        const response = await authRequest.signupTenant({
            name,
            storeName,
            email,
            password,
            domainName,
        });
        const { status, data, error } = response;
        if (status) {
            SignUpService.authenticatedRedirectionHandler(data, history);
        } else {
            const resultError: { [key in keyof Partial<ISignupFormValues>]: string } = {};
            if (error.message) {
                showNotify(error?.message);
            }
            switch (error.code) {
                case ERROR_CODE.VALIDATION_ERROR:
                    error?.errors?.forEach((err) => {
                        resultError[err.name as keyof ISignupFormValues] = err.message;
                    });
                    break;
                case ERROR_CODE.TENANT_ALREADY_EXIST:
                    resultError['email'] = 'Email id already exist!';
                    break;
                case ERROR_CODE.DOMAIN_ALREADY_EXIST:
                    resultError[
                        'domainName'
                    ] = `${values.domainName}.${CONFIG.BASE_DOMAIN_NAME} is not Available!`;
                    break;
                default:
                    break;
            }
            return resultError;
        }
    };

    static authenticatedRedirectionHandler = (
        data: ISignupTenantResponse['data'],
        history: ReturnType<typeof useHistory>,
    ): void => {
        // authenticate user and redirect to the retrived domain
        if (data?.domainName) {
            showNotify('Store created successfully, Redirecting to your store...', {
                theme: 'success',
                autoHideDuration: 2000,
                onClose: () => {
                    window.open(`http://${data?.domainName}`, '_self');
                },
            });
        } else {
            showNotify('Something went wrong, try sigining in with your email id password');
            history.push(ROUTES.CACHED_SIGN_IN);
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

    static getStaticFieldProps = (
        fieldName: string,
        { error, touched, dirtySinceLastSubmit, submitError }: FieldMetaState<string>,
        form: FormApi<ISignupFormValues, Partial<ISignupFormValues>>,
    ): {
        helperMessage: IInputFieldProps['helperMessage'];
        theme: IInputFieldProps['theme'];
    } => {
        if (dirtySinceLastSubmit && submitError) {
            form.mutators.resetMutator(fieldName);
        }
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
