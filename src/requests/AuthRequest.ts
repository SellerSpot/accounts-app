import {
    ISignupTenantRequest,
    ISignupTenantResponse,
    ISigninTenantRequest,
    ISigninTenantResposne,
    ROUTES,
    REQUEST_METHOD,
} from '@sellerspot/universal-types';

import { apiService } from 'services/services';
import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.AUTH);
    }

    async signupTenant(payload: ISignupTenantRequest): Promise<ISignupTenantResponse> {
        return <ISignupTenantResponse>await apiService.request({
            url: this.getUrl(ROUTES.AUTH.SIGN_UP),
            method: REQUEST_METHOD.POST,
            payload,
        });
    }

    async signInTenant(payload: ISigninTenantRequest): Promise<ISigninTenantResposne> {
        return <ISignupTenantResponse>await apiService.request({
            url: this.getUrl(ROUTES.AUTH.SIGN_IN),
            method: REQUEST_METHOD.POST,
            payload,
        });
    }
}
