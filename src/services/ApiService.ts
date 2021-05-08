import Axios, { AxiosInstance } from 'axios';
import { IResponse, IErrorResponse, ERROR_CODE, REQUEST_METHOD } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';
import { showNotify } from '@sellerspot/universal-components';

export interface IApiServiceProps {
    token: string;
}

export interface IRequestPayload {
    url: string;
    method: REQUEST_METHOD;
    payload?: unknown;
}

export class ApiService {
    private axios: AxiosInstance;

    constructor(props: IApiServiceProps) {
        this.initiateService(props);
    }

    public initiateService = async (props: IApiServiceProps): Promise<void> => {
        const { SERVER_URL } = CONFIG;
        this.axios = Axios.create({
            baseURL: SERVER_URL,
            headers: {
                AUTHORIZATION: `Bearer ${props.token}`,
            },
            withCredentials: true,
        });
    };

    public async request(requestPayload: IRequestPayload): Promise<IResponse> {
        try {
            const { url, method, payload } = requestPayload;
            const response = await this.axios.request({
                url,
                method,
                data: payload,
            });
            if (response.data.status !== undefined) return response.data;
            else {
                throw new Error('unknown error');
            }
        } catch (errorInstance) {
            const data: IResponse = errorInstance?.response?.data;
            const { status, error } = data;
            if (status !== undefined && error !== undefined) {
                const { code } = error;
                switch (code) {
                    case ERROR_CODE.NOT_AUTHENTICATED_USER:
                        // unauthenticate and redirect to accoutns app accounts.sellerspot.in/signin?store=thaya.sellerspot.in&path=/routeintheapp
                        return data;

                    default:
                        return data;
                }
            } else {
                // uncaught errors will go here
                // connectivity issues will be caught here
                const errorResponse: IErrorResponse = {
                    code: ERROR_CODE.UNKNOWN_ERROR,
                    message: 'Something went wrong, please try again later!',
                };
                showNotify(errorResponse.message);
                return { status: false, error: errorResponse };
            }
        }
    }
}
