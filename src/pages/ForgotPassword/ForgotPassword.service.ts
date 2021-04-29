import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';

import { IInputFieldProps } from '@sellerspot/universal-components';

import { IForgotPasswordFormValues } from './ForgotPassword.types';

export default class ForgotPasswordService {
    static initialFormValues: IForgotPasswordFormValues = {
        email: '',
    };

    static submitionHandler = async (values: IForgotPasswordFormValues): Promise<void> => {
        // submition logic goes here
        console.log(values);
    };

    static validationHandler = (
        value: string,
        fieldPath: keyof IForgotPasswordFormValues,
    ): string => {
        const requiredSchema: yup.SchemaOf<IForgotPasswordFormValues[typeof fieldPath]> = yup.reach(
            ForgotPasswordService.validationSchema,
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

    private static validationSchema: yup.SchemaOf<IForgotPasswordFormValues> = yup.object().shape({
        email: yup.string().required('Email is required').email('Invalid email id'),
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
