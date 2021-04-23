import * as yup from 'yup';
import { AnyObject, setIn } from 'final-form';
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
        // do subimtion
    };

    static validationHandler = async (values: React.FormEvent<Element>): Promise<AnyObject> => {
        try {
            await SignUpService.validationSchema.validate(values, {
                abortEarly: false,
            });
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const innerErrorObjectFormationHandler = (
                    previousValue: { [key: string]: string },
                    currentValue: yup.ValidationError,
                ) => {
                    return setIn(previousValue, currentValue.path, currentValue.message);
                };
                const errors = error.inner.reduce(innerErrorObjectFormationHandler, {});
                return errors;
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
