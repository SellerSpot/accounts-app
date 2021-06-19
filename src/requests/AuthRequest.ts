import {
    ICheckDomainAvailabilityResponse,
    IIdentifyStoreResponse,
    ISigninTenantResponse,
    ISignupTenantResponse,
    ISignupTenantRequest,
    ISigninTenantRequest,
    ICurrentUserResponse,
    ROUTES,
} from '@sellerspot/universal-types';

import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
    constructor() {
        super('AUTH');
    }

    async signupTenant(payload: ISignupTenantRequest): Promise<ISignupTenantResponse> {
        return <ISignupTenantResponse>await this.request({
            url: ROUTES.AUTH.AUTH.SIGN_UP,
            method: 'POST',
            payload,
        });
    }

    async signInTenant(payload: ISigninTenantRequest): Promise<ISigninTenantResponse> {
        return <ISigninTenantResponse>await this.request({
            url: ROUTES.AUTH.AUTH.SIGN_IN,
            method: 'POST',
            payload,
        });
    }

    async checkIsUserAuthenticated(domainName: string): Promise<ICurrentUserResponse> {
        return <ICurrentUserResponse>await this.request({
            url: `${ROUTES.AUTH.AUTH.CURRENT_USER}?domain=${domainName}`,
            method: 'GET',
        });
    }

    async checkDomainAvailability(domainName: string): Promise<ICheckDomainAvailabilityResponse> {
        return await this.request({
            url: `${ROUTES.AUTH.DOMAIN.CHECK_DOMAIN_AVAILABILITY}?domain=${domainName}`,
            method: 'GET',
        });
    }

    async identifyStore(domainName: string): Promise<IIdentifyStoreResponse> {
        return <IIdentifyStoreResponse>await this.request({
            url: `${ROUTES.AUTH.DOMAIN.IDENTIFY_STORE}?domain=${domainName}`,
            method: 'GET',
        });
    }
}
