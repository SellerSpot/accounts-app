import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';

import { Button, TFormSubmitionHandler } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import {
    EmailAddressField,
    NameField,
    PasswordField,
    StoreNameField,
    StoreUrlField,
} from './components/Fields';
import SignUpService from './Signup.service';

import commonStyles from '../../styles/common.module.scss';
import { Loader } from 'components/Loader/Loader';
import { ISignupFormValues } from './SignUp.types';
import { Mutator } from 'final-form';

export const SignUp = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    // effects
    useEffect(() => {
        setIsLoading(false);
    }, []);

    // handlers
    const cachedSignInHandler = () => {
        history.push(ROUTES.CACHED_SIGN_IN);
    };

    const submitionHandler = async (values: ISignupFormValues) => {
        return await SignUpService.submitionHandler(values, history);
    };

    const resetMutator = (
        arg: [keyof ISignupFormValues],
        state: { formState: { submitErrors: { [key in keyof ISignupFormValues]: string } } },
    ) => {
        const fieldName = arg[0];
        state.formState.submitErrors[fieldName] = undefined;
    };

    if (isLoading) return <Loader />;

    return (
        <div className={commonStyles.commonFormWithContentWrapper}>
            <h4 className={commonStyles.welcomeTitle}>
                Join our team of 10 million countrywide stores
            </h4>
            <h6 className={commonStyles.welcomeSubTitle}>
                One more step to taking your business to the next level
            </h6>
            <Button
                type="button"
                theme="primary"
                variant="text"
                size="small"
                onClick={cachedSignInHandler}
                label="Already have a store? Sign in"
                className={{ wrapper: commonStyles.signInLink }}
            />
            <Form
                onSubmit={submitionHandler}
                initialValues={SignUpService.initialFormValues}
                subscription={{ submitting: true, submitSucceeded: true }} // empty object overrides all subscriptions
                mutators={{ resetMutator: resetMutator as Mutator<ISignupFormValues> }}
            >
                {({ handleSubmit, submitting, form, submitSucceeded }) => {
                    const validatedHandleSubmit: TFormSubmitionHandler = (e) => {
                        e.preventDefault();
                        if (!(submitting || submitSucceeded)) handleSubmit(e);
                    };
                    let submitButtonLabel = 'Create your store for free';
                    if (submitting) {
                        submitButtonLabel = 'Please wait, Creating your store...';
                    } else if (submitSucceeded) {
                        submitButtonLabel = 'Your store has been created';
                    }
                    return (
                        <form
                            onSubmit={validatedHandleSubmit}
                            className={commonStyles.formWrapper}
                            noValidate
                        >
                            <NameField form={form} />
                            <StoreNameField form={form} />
                            <StoreUrlField form={form} />
                            <EmailAddressField form={form} />
                            <PasswordField form={form} />
                            <Button
                                type="submit"
                                theme="primary"
                                variant="contained"
                                size="large"
                                fullWidth={true}
                                label={submitButtonLabel}
                                isLoading={submitting || submitSucceeded}
                            />
                        </form>
                    );
                }}
            </Form>
        </div>
    );
};
