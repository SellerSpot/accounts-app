import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';
import { IInputFieldProps, showNotify } from '@sellerspot/universal-components';
import { IDomainDetails, IStoreDetails } from '@sellerspot/universal-types';

import { ISignInFormValues } from './SignIn.types';
import { authRequest } from 'requests/requests';
import SignUpService from 'pages/SignUp/Signup.service';
import { useHistory } from 'react-router';
import { FormApi } from 'final-form';
import CachedSignInService from 'pages/CachedSignIn/CachedSignIn.service';

export default class SignInService {
    static initialFormValues: ISignInFormValues = {
        email: '',
        password: '',
    };

    static submitionHandler = async (
        tenantId: string,
        values: ISignInFormValues,
        history: ReturnType<typeof useHistory>,
    ): Promise<unknown> => {
        const { email, password } = values;
        // submition logic goes here
        const response = await authRequest.signInTenant({
            email,
            password,
            tenantId,
        });
        const { status, data, error } = response;
        if (status && data?.store) {
            // on success authenticate and redirect user to their app
            SignUpService.authenticatedRedirectionHandler(data?.store, history);
        } else {
            const errorMessage = 'Email or password is not valid!';
            if (error.message) {
                showNotify(errorMessage);
            }
            const resultError: { [key in keyof Partial<ISignInFormValues>]: string } = {};
            resultError['email'] = errorMessage;
            return resultError;
        }
    };

    static checkHasValidStoreDetail = (state: IStoreDetails): boolean => {
        const domainDetailsSchems: yup.SchemaOf<IDomainDetails> = yup.object().shape({
            isCustomDomain: yup.boolean().required(),
            domainName: yup.string().required(),
            url: yup.string().required(),
            name: yup.string().required(),
        });
        const storeDetailValidationSchema: yup.SchemaOf<
            Pick<IStoreDetails, 'id' | 'domainDetails' | 'storeName'>
        > = yup.object().shape({
            id: yup.string().required(),
            storeName: yup.string().required(),
            domainDetails: domainDetailsSchems,
        });
        try {
            storeDetailValidationSchema.validateSync(state, { abortEarly: true });
            return true;
        } catch (error) {
            CachedSignInService.removeACachedStore(state?.id);
            return false;
        }
    };

    static redirectIfAuthenticated = async (
        domainName: string,
        history: ReturnType<typeof useHistory>,
    ): Promise<boolean> => {
        const { status, data } = await authRequest.checkIsUserAuthenticated(domainName);
        if (status && data?.store) {
            // make redirection
            SignUpService.authenticatedRedirectionHandler(data?.store, history);
            return true;
        }
        // return false to show the sigin page for the current selected tenant
        return false;
    };

    static validationHandler = (value: string, fieldPath: keyof ISignInFormValues): string => {
        const requiredSchema: yup.SchemaOf<ISignInFormValues[typeof fieldPath]> = yup.reach(
            SignInService.validationSchema,
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

    private static validationSchema: yup.SchemaOf<ISignInFormValues> = yup.object().shape({
        email: yup.string().required('Email is required').email('Invalid email id'),
        password: yup.string().required('Password is required'),
    });

    static getStaticFieldProps = (
        fieldName: string,
        { error, touched, dirtySinceLastSubmit, submitError }: FieldMetaState<string>,
        form: FormApi<ISignInFormValues, Partial<ISignInFormValues>>,
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
