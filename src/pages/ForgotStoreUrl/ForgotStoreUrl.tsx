import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';

import { Button, TFormSubmitionHandler } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { EmailAddressField } from './components/Fields';
import ForgotStoreUrlService from './ForgotStoreUrl.service';

import commonStyles from '../../styles/common.module.scss';
import { IForgotStoreUrlFormValues } from './ForgotStoreUrl.types';
import { Loader } from 'components/Loader/Loader';

export const ForgotStoreUrl = (): ReactElement => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    // handlers
    const identifyStoreHandler = () => history.push(ROUTES.IDENTIFY_STORE);

    const submitionHandler = (values: IForgotStoreUrlFormValues) =>
        ForgotStoreUrlService.submitionHandler(values);

    return (
        <Loader isLoading={isLoading}>
            <div className={commonStyles.commonFormWithContentWrapper}>
                <h4 className={commonStyles.welcomeTitle}>Forgot Store URL?</h4>
                <h6 className={commonStyles.welcomeSubTitle}>
                    The Store URL will be sent to the admin&apos;s registered email address.
                </h6>
                <Button
                    type="button"
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={identifyStoreHandler}
                    label="Remember your store URL?"
                    className={{ wrapper: commonStyles.signInLink }}
                />
                <Form
                    onSubmit={submitionHandler}
                    initialValues={ForgotStoreUrlService.initialFormValues}
                    subscription={{}} // empty object overrides all subscriptions
                >
                    {({ handleSubmit, submitting, submitSucceeded }) => {
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
                                <EmailAddressField />
                                <Button
                                    type="submit"
                                    theme="primary"
                                    variant="contained"
                                    size="large"
                                    label="Send Store URL"
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
