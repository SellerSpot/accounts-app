import { FieldMetaState } from 'react-final-form';
import * as yup from 'yup';

import { IInputFieldProps } from '@sellerspot/universal-components';

import { IForgotStoreUrlFormValues } from './ForgotStoreUrl.types';

export default class ForgotStoreUrlService {
    static initialFormValues: IForgotStoreUrlFormValues = {
        email: '',
    };

    static submitionHandler = async (values: IForgotStoreUrlFormValues): Promise<void> => {
        // submition logic goes here
        console.log(values);
    };

    static validationHandler = (
        value: string,
        fieldPath: keyof IForgotStoreUrlFormValues,
    ): string => {
        const requiredSchema: yup.SchemaOf<IForgotStoreUrlFormValues[typeof fieldPath]> = yup.reach(
            ForgotStoreUrlService.validationSchema,
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

    private static validationSchema: yup.SchemaOf<IForgotStoreUrlFormValues> = yup.object().shape({
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
