import Axios, { AxiosInstance } from 'axios';
import { IResponse, IErrorResponse, ERROR_CODE, REQUEST_METHOD } from '@sellerspot/universal-types';
import { CONFIG } from 'config/config';

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
        } catch (error) {
            if (error?.response?.data?.status !== undefined) {
                const data: IResponse = error?.response?.data;
                if (data.error.code === ERROR_CODE.NOT_AUTHENTICATED_USER) {
                    // unauthenticate and redirect to accoutns app accounts.sellerspot.in/signin?store=thaya.sellerspot.in&path=/routeintheapp
                    // clears localstorage
                } else {
                    return error.response.data;
                }
            } else {
                // connectivity issues can be caught here
                const errorResponse: IErrorResponse = {
                    code: ERROR_CODE.UNKNOWN_ERROR,
                    message: 'Something went wrong, please try again later!',
                };
                return { status: false, error: errorResponse };
            }
        }
        // for complex cases when we need to manage authorization
        // tap the response, unauthenticate the user and redirect to login route (accounts app)
    }
}
