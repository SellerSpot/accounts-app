import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Form } from 'react-final-form';

import { Button, showNotify, TFormSubmitionHandler } from '@sellerspot/universal-components';
import { IStoreDetails } from '@sellerspot/universal-types';

import { ROUTES } from 'config/routes';
import { EmailAddressField, PasswordField } from './components/Fields';
import SignInService from './SignIn.service';
import commonStyles from '../../styles/common.module.scss';
import { ISignInFormValues } from './SignIn.types';
import { Loader } from 'components/Loader/Loader';
import CachedSignInService from 'pages/CachedSignIn/CachedSignIn.service';
import { useQuery } from 'customHooks/useQuery';
import { authRequest } from 'requests/requests';
import { CONFIG } from 'config/config';
import { Mutator } from 'final-form';

export const SignIn = (): ReactElement => {
    const history = useHistory();
    const queryParams = useQuery();
    const [isLoading, setIsLoading] = useState(true);
    const [storeDetail, setStoreDetail] = useState<IStoreDetails>({
        domainDetails: {
            domainName: '',
            isCustomDomain: false,
            url: '',
            name: '',
        },
        storeName: '',
        id: '',
        installedPlugins: [],
    });
    const location = useLocation<IStoreDetails>();

    // performs validation and authenticates user if already signin
    const validateStoreDetails = async () => {
        let storeState = location.state;
        try {
            //  pick domain name to validate the store from queryParam or via location state
            let domainFromUrl = storeState?.domainDetails.domainName;
            if (!storeState) {
                domainFromUrl = queryParams.get(CONFIG.SIGN_IN_STORE_DOMAIN_PARAM);
            }
            // check is valid store from server
            if (domainFromUrl) {
                const { status, data } = await authRequest.identifyStore(domainFromUrl);
                if (status) {
                    storeState = data.store;
                } else {
                    throw new Error('Invalid store');
                }
            } else {
                throw new Error('Invalid store');
            }
            // check has valid store format
            if (SignInService.checkHasValidStoreDetail(storeState)) {
                if (
                    !(await SignInService.redirectIfAuthenticated(
                        storeState.domainDetails.domainName,
                        history,
                    ))
                ) {
                    setStoreDetail(storeState);
                    setIsLoading(false);
                }
            } else {
                throw new Error('Invalid store');
            }
        } catch (error) {
            // show notification - for invalid store
            showNotify('Invalid store, Please check store url!');
            // clear the failded cached store handler
            CachedSignInService.removeACachedStore(storeState?.id);
            //  redirect to cached sigin component
            cachedSignInHandler();
        }
    };

    // effects
    useEffect(() => {
        validateStoreDetails();
    }, []);

    // handlers
    const cachedSignInHandler = () => history.push(ROUTES.CACHED_SIGN_IN);

    const forgotPasswordHandler = () => history.push(ROUTES.FORGOT_PASSWORD, storeDetail);

    const submitionHandler = async (values: ISignInFormValues) => {
        return await SignInService.submitionHandler(storeDetail.id, values, history);
    };

    const resetMutator = (
        arg: [keyof ISignInFormValues],
        state: { formState: { submitErrors: { [key in keyof ISignInFormValues]: string } } },
    ) => {
        const fieldName = arg[0];
        state.formState.submitErrors[fieldName] = undefined;
    };

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
                <h5 className={commonStyles.storeTitle}>{storeDetail.domainDetails.domainName}</h5>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={cachedSignInHandler}
                    label="Not your store?"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={SignInService.initialFormValues}
                    mutators={{ resetMutator: resetMutator as Mutator<ISignInFormValues> }}
                    subscription={{ submitting: true, submitSucceeded: true }} // empty object overrides all subscriptions
                >
                    {({ handleSubmit, submitting, form, submitSucceeded }) => {
                        let submitButtonLabel = 'Login to your store';
                        if (submitting)
                            submitButtonLabel = 'Please wait, checking your credentials...';
                        else if (submitSucceeded)
                            submitButtonLabel = 'Redirecting to your store...';
                        const validatedHandleSubmit: TFormSubmitionHandler = (e) => {
                            e.preventDefault();
                            if (!(submitting || submitSucceeded)) handleSubmit(e);
                        };
                        return (
                            <form
                                onSubmit={validatedHandleSubmit}
                                className={commonStyles.formWrapper}
                                noValidate
                            >
                                <EmailAddressField form={form} />
                                <PasswordField form={form} />
                                <Button
                                    type="button"
                                    theme="primary"
                                    variant="text"
                                    size="small"
                                    onClick={forgotPasswordHandler}
                                    label="Forgot Password?"
                                    className={{ wrapper: commonStyles.fogotPasswordLink }}
                                />
                                <Button
                                    type="submit"
                                    theme="primary"
                                    variant="contained"
                                    size="large"
                                    label={submitButtonLabel}
                                    fullWidth={true}
                                    isLoading={submitting || submitSucceeded}
                                />
                            </form>
                        );
                    }}
                </Form>
            </div>
        </Loader>
    );
};
