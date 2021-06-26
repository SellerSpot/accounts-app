import React, { ReactElement } from 'react';
import cn from 'classnames';

import { Skeleton } from '@sellerspot/universal-components';

import commonStyles from '../../styles/common.module.scss';
import loaderStyles from './Loader.module.scss';

export const Loader = (): ReactElement => {
    return (
        <>
            <div
                className={cn(
                    commonStyles.commonFormWithContentWrapper,
                    loaderStyles.skeletonContainer,
                )}
            >
                <Skeleton animation={'wave'} variant={'rect'} height={40} />
                <Skeleton animation={'wave'} variant={'rect'} height={40} />
                <Skeleton animation={'wave'} variant={'rect'} height={40} />
                <Skeleton animation={'wave'} variant={'rect'} height={40} />
            </div>
        </>
    );
};
