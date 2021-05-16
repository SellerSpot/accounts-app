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

import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.AUTH);
    }

    async signupTenant(payload: ISignupTenantRequest): Promise<ISignupTenantResponse> {
        return <ISignupTenantResponse>await this.request({
            url: ROUTES.AUTH.SIGN_UP,
            method: REQUEST_METHOD.POST,
            payload,
        });
    }

    async signInTenant(payload: ISigninTenantRequest): Promise<ISigninTenantResponse> {
        return <ISigninTenantResponse>await this.request({
            url: ROUTES.AUTH.SIGN_IN,
            method: REQUEST_METHOD.POST,
            payload,
        });
    }

    async checkIsUserAuthenticated(domainName: string): Promise<ICurrentUserResponse> {
        return <ICurrentUserResponse>await this.request({
            url: `${ROUTES.AUTH.CURRENT_USER}?domain=${domainName}`,
            method: REQUEST_METHOD.GET,
        });
    }

    async checkDomainAvailability(domainName: string): Promise<ICheckDomainAvailabilityResponse> {
        return await this.request({
            url: `${ROUTES.AUTH.CHECK_DOMAIN_AVAILABILITY}?domain=${domainName}`,
            method: REQUEST_METHOD.GET,
        });
    }

    async identifyStore(domainName: string): Promise<IIdentifyStoreResponse> {
        return <IIdentifyStoreResponse>await this.request({
            url: `${ROUTES.AUTH.IDENTIFY_STORE}?domain=${domainName}`,
            method: REQUEST_METHOD.GET,
        });
    }
}
