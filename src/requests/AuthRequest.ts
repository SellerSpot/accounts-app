import {
    ISignupTenantRequest,
    // ISigninTenantRequest,
    // ISignupTenantResponse,
    // ISigninTenantResposne,
    ROUTES,
    // REQUEST_METHOD,
    // IResponse,
} from '@sellerspot/universal-types';
import {
    ISigninTenantRequest,
    ISigninTenantResponse,
    ISignupTenantResponse,
    ICheckDomainAvailability,
} from 'typings/temp.types';
import { introduceDelay } from 'utilities/general';

// import { apiService } from 'services/services';
import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
    constructor() {
        super(ROUTES.SERVICE.AUTH);
    }

    async signupTenant(payload: ISignupTenantRequest): Promise<ISignupTenantResponse> {
        return new Promise((resolve) => {
            const success = payload && true;
            if (success)
                resolve({
                    status: true,
                    data: {
                        store: {
                            id: 'dGhheWEuc2VsbGVyc3BvdC5pbg==',
                            storeName: 'Thaya stores',
                            domainName: 'thaya.sellerspot.in',
                        },
                        user: {
                            id: 'Z3J0aGF5YWxhbjE4QGdtYWlsLmNvbQ==',
                            email: 'grthayalan18@gmail.com',
                            name: 'Thayalan G R',
                        },
                    },
                });
        });
        // return <ISignupTenantResponse>await apiService.request({
        //     url: this.getUrl(ROUTES.AUTH.SIGN_UP),
        //     method: REQUEST_METHOD.POST,
        //     payload,
        // });
    }

    async signInTenant(payload: ISigninTenantRequest): Promise<ISigninTenantResponse> {
        return new Promise(async (resolve) => {
            const success = payload && true;
            if (success) {
                await introduceDelay(1000);
                resolve({
                    status: true,
                    data: {
                        store: {
                            id: 'dGhheWEuc2VsbGVyc3BvdC5pbg==',
                            storeName: 'Thaya stores',
                            domainName: 'thaya.sellerspot.in',
                        },
                        user: {
                            id: 'Z3J0aGF5YWxhbjE4QGdtYWlsLmNvbQ==',
                            email: 'grthayalan18@gmail.com',
                            name: 'Thayalan G R',
                        },
                    },
                });
            }
        });
        // return <ISigninTenantResposne>await apiService.request({
        //     url: this.getUrl(ROUTES.AUTH.SIGN_IN),
        //     method: REQUEST_METHOD.POST,
        //     payload,
        // });
    }

    async checkIfUserAuthenticated(domainName: string): Promise<ISigninTenantResponse> {
        return new Promise(async (resolve) => {
            const success = domainName && true;
            if (success) {
                await introduceDelay(1000);
                resolve({
                    status: true,
                    data: {
                        store: {
                            id: 'dGhheWEuc2VsbGVyc3BvdC5pbg==',
                            storeName: 'Thaya stores',
                            domainName: 'thaya.sellerspot.in',
                        },
                        user: {
                            id: 'Z3J0aGF5YWxhbjE4QGdtYWlsLmNvbQ==',
                            email: 'grthayalan18@gmail.com',
                            name: 'Thayalan G R',
                        },
                    },
                });
            } else {
                resolve({
                    status: false,
                });
            }
        });
    }

    async checkDomainAvailability(payload: string): Promise<ICheckDomainAvailability> {
        return new Promise(async (resolve, reject) => {
            const success = payload && true;
            if (success) {
                await introduceDelay(1000);
                resolve({ status: true });
            } else reject({ status: false });
        });
    }
}
