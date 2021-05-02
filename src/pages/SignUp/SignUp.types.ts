import { FormApi } from 'final-form';
// import { FieldRenderProps } from 'react-final-form';

export interface ISignupFormValues {
    name: string;
    storeName: string;
    domainName: string;
    email: string;
    password: string;
}

// export type TFieldProps<T extends keyof ISignupFormValues> = {
//     fieldProps: FieldRenderProps<ISignupFormValues[T]>;
// };

export interface IFieldProps {
    form: FormApi<ISignupFormValues, Partial<ISignupFormValues>>;
}
