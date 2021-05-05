import { IResponse } from '@sellerspot/universal-types';

// temproary types
export interface IStoreDetails {
    id: string;
    storeName: string;
    domainName: string;
}
export interface IUserDetails {
    id: string;
    name: string;
    email: string;
}

export interface ISignupTenantResponse extends IResponse {
    data: {
        store: IStoreDetails;
        user: IUserDetails;
    };
}

// signin
export interface ISigninTenantRequest {
    tenantId: string;
    email: string;
    password: string;
}

export interface ISigninTenantResponse extends IResponse {
    data?: {
        store: IStoreDetails;
        user: IUserDetails;
    };
}

export interface IIdentifyStoreResponse extends IResponse {
    data?: {
        store: IStoreDetails;
    };
}

export type ICheckDomainAvailability = IResponse;
