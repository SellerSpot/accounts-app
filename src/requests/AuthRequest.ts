import {
    ISignupTenantRequest,
    ISignupTenantResponse,
    ISigninTenantRequest,
    ISigninTenantResposne,
    ROUTES,
    REQUEST_METHOD,
} from '@sellerspot/universal-types';

import { apiService } from 'services/services';

export default class AuthRequest {
    static async signupTenant(payload: ISignupTenantRequest): Promise<ISignupTenantResponse> {
        return <ISignupTenantResponse>await apiService.request({
            url: ROUTES.AUTH.SIGN_UP,
            method: REQUEST_METHOD.POST,
            payload,
        });
    }

    static async signInTenant(payload: ISigninTenantRequest): Promise<ISigninTenantResposne> {
        return <ISignupTenantResponse>await apiService.request({
            url: ROUTES.AUTH.SIGN_IN,
            method: REQUEST_METHOD.POST,
            payload,
        });
    }
}
