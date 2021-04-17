import { COLORS, FONT_SIZE } from 'config/theme';
import { initializeThemeConfig } from '@sellerspot/universal-components';

export const initializeGlobalConfig = async (): Promise<void> => {
    initializeUniversalComponents();
};

const initializeUniversalComponents = () => {
    initializeThemeConfig({
        colors: COLORS,
        fontSizes: FONT_SIZE,
    });
};
