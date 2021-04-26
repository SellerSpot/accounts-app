import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-final-form';

import { Button } from '@sellerspot/universal-components';
import { ROUTES } from 'config/routes';
import { StoreUrlField } from './components/Fields';
import IdentifyStoreService from './IdentifyStore.service';

import commonStyles from '../../styles/common.module.scss';
import { IIdentifyStoreFormValues } from './IdentifyStore.types';

export const IdentifyStore = (): ReactElement => {
    const history = useHistory();

    const signupHandler = () => {
        history.push(ROUTES.SIGN_UP);
    };

    const submitionHandler = (values: IIdentifyStoreFormValues) =>
        IdentifyStoreService.submitionHandler(values);

    return (
        <div className={commonStyles.commonFormWithContentWrapper}>
            <h4 className={commonStyles.welcomeTitle}>Sign in to</h4>
            <Button
                type="button"
                theme="primary"
                variant="text"
                size="small"
                onClick={signupHandler}
                label="Don't have an account? Signup instead"
                className={{ wrapper: commonStyles.signInLink }}
            />
            <Form
                onSubmit={submitionHandler}
                initialValues={IdentifyStoreService.initialFormValues}
                subscription={{}} // empty object overrides all subscriptions
            >
                {({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className={commonStyles.formWrapper} noValidate>
                        <StoreUrlField />
                        <Button
                            type="submit"
                            theme="primary"
                            variant="contained"
                            size="large"
                            label="Login to your store"
                            fullWidth={true}
                            disabled={submitting}
                        />
                    </form>
                )}
            </Form>
        </div>
    );
};
