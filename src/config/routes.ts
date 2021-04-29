export const ROUTES = {
    SIGN_UP: '/signup',
    IDENTIFY_STORE: '/identifystore',
    CACHED_SIGN_IN: '/cachedsignin',
    FORGOT_PASSWORD: '/forgotpassword',
    FORGOT_STORE_URL: '/forgotstoreurl',
    /**
     * will contain internal route history to trace tenant details.
     */
    SIGN_IN: '/signin',
    /**
     * will contains query params for tracing tenant and owner.
     */
    RESET_PASSWORD: '/resetpassword/:token',
};
