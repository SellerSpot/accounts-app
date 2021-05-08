import {
    ICheckDomainAvailabilityResponse,
    IIdentifyStoreResponse,
    ISigninTenantResponse,
    ISignupTenantResponse,
    ISignupTenantRequest,
    ISigninTenantRequest,
    ICurrentUserResponse,
    REQUEST_METHOD,
    ROUTES,
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

    async signInTenant(payload: ISigninTenantRequest): Promise<ISigninTenantResponse> {
        return <ISigninTenantResponse>await apiService.request({
            url: this.getUrl(ROUTES.AUTH.SIGN_IN),
            method: REQUEST_METHOD.POST,
            payload,
        });
    }

    async checkIsUserAuthenticated(domainName: string): Promise<ICurrentUserResponse> {
        return <ICurrentUserResponse>await apiService.request({
            url: `${this.getUrl(`${ROUTES.AUTH.CURRENT_USER}?domain=${domainName}`)}`,
            method: REQUEST_METHOD.GET,
        });
    }

    async checkDomainAvailability(domainName: string): Promise<ICheckDomainAvailabilityResponse> {
        return await apiService.request({
            url: `${this.getUrl(ROUTES.AUTH.CHECK_DOMAIN_AVAILABILITY)}?domain=${domainName}`,
            method: REQUEST_METHOD.GET,
        });
    }

    async identifyStore(domainName: string): Promise<IIdentifyStoreResponse> {
        return <IIdentifyStoreResponse>await apiService.request({
            url: this.getUrl(`${ROUTES.AUTH.IDENTIFY_STORE}?domain=${domainName}`),
            method: REQUEST_METHOD.GET,
        });
    }
}
