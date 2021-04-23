import * as yup from 'yup';
import { AnyObject, setIn } from 'final-form';
import { ISignupFormValues } from './SignUp.types';
import { introduceDelay } from 'utilities/general';

export default class SignUpService {
    static initialFormValues: ISignupFormValues = {
        name: '',
        storeName: '',
        storeUrl: '',
        email: '',
        password: '',
    };

    static submitionHandler = async (values: React.FormEvent<Element>): Promise<void> => {
        // do subimtion
    };

    static asyncValidationHandler = async (
        value: string,
        fieldPath: keyof ISignupFormValues,
    ): Promise<string> => {
        if (fieldPath === 'storeUrl') {
            await introduceDelay(2000);
        }
        // get schema instance for the required field
        const requiredSchema = yup.reach(SignUpService.validationSchema, fieldPath);
        try {
            requiredSchema.validateSync(value, {
                abortEarly: true,
            });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return error.message;
            }
            // uncaught error
            return error;
        }
    };

    static validationHandler = (value: string, fieldPath: keyof ISignupFormValues): string => {
        // TODO: Please remove this
        // NOTE: ASYNC Validation is triggering unoptimized form renders
        // if (fieldPath === 'storeUrl') {
        //     await introduceDelay(2000);
        // }
        // get schema instance for the required field
        const requiredSchema = yup.reach(SignUpService.validationSchema, fieldPath);
        try {
            requiredSchema.validateSync(value, {
                abortEarly: true,
            });
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
            .min(3, 'Store name should be more than 3 characters')
            .max(15, 'Store name should not be more than 15 characters'),
        password: yup
            .string()
            .required('Password is required')
            .min(3, 'Password length should be more than 3'),
        email: yup.string().required('Email is required').email('Invalid email id'),
    });
}
