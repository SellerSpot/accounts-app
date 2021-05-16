export const CONFIG = {
    ENV: process.env.ENV, // development | production
    SERVER_URL: process.env.SERVER_URL,
    LANDING_APP_URL: process.env.LANDING_APP_URL,
    BASE_DOMAIN_NAME: process.env.BASE_DOMAIN_NAME,

    // cached store key
    CACHED_STORES: 'cachedStores',
    // REDUX STATES
    REUDX_AUTH_STATE: 'authState',
    SIGN_IN_STORE_DOMAIN_PARAM: 'store',
};
