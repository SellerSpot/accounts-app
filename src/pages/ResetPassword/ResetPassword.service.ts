import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';

import { IInputFieldProps } from '@sellerspot/universal-components';

import { IResetPasswordFormValues, IResetToken } from './ResetPassword.types';

export default class ResetPasswordService {
    static initialFormValues: IResetPasswordFormValues = {
        password: '',
    };

    static submitionHandler = async (values: IResetPasswordFormValues): Promise<void> => {
        // submition logic goes here
        console.log(values);
    };

    static validationHandler = (
        value: string,
        fieldPath: keyof IResetPasswordFormValues,
    ): string => {
        const requiredSchema: yup.SchemaOf<IResetPasswordFormValues[typeof fieldPath]> = yup.reach(
            ResetPasswordService.validationSchema,
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

    private static validationSchema: yup.SchemaOf<IResetPasswordFormValues> = yup.object().shape({
        password: yup
            .string()
            .required('Password is required')
            .min(3, 'Password length should be more than 3'),
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

    static validateResetToken(token: string): IResetToken | false {
        if (token) {
            return {
                resetToken: token,
                storeDetails: {
                    domainName: 'sreenidhi.sellerspot.in',
                    storeName: 'Sreenidhi Departmental Store',
                    id: 'uniqueid1',
                },
            };
        }
        return false;
    }
}
