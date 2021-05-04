import { IStoreDetails } from 'typings/temp.types';

export interface IResetPasswordFormValues {
    password: string;
}

export interface IResetPasswordParams {
    token: string;
}

export interface IResetToken {
    resetToken: string;
    storeDetails: IStoreDetails;
}
