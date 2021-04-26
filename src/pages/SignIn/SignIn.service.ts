import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';

import { IInputFieldProps } from '@sellerspot/universal-components';

import { ISignInFormValues } from './SignIn.types';

export default class SignInService {
    static initialFormValues: ISignInFormValues = {
        email: '',
        password: '',
    };

    static submitionHandler = async (values: ISignInFormValues): Promise<void> => {
        // submition logic goes here
        console.log(values);
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
