import React, { ReactElement } from 'react';
import cn from 'classnames';

import { Skeleton } from '@sellerspot/universal-components';

import animationStyles from '../../styles/animation.module.scss';
import commonStyles from '../../styles/common.module.scss';
import loaderStyles from './Loader.module.scss';

interface ILoaderProps {
    isLoading: boolean;
    children?: ReactElement | ReactElement[] | string | number;
}

export const Loader = (props: ILoaderProps): ReactElement => {
    const { isLoading, children } = props;
    return (
        <>
            {isLoading ? (
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
            ) : (
                <div className={animationStyles.fadeIn}>{children}</div>
            )}
        </>
    );
};
