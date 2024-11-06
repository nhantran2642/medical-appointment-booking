import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: "Welcome",
                    footer_text: "All Rights Reserved by PNTEC-LTD",
                    // thêm các bản dịch tiếng Anh ở đây
                },
            },
            vi: {
                translation: {
                    welcome: "Chào mừng",
                    footer_text: "Bản quyền thuộc về PNTEC-LTD",
                    // thêm các bản dịch tiếng Việt ở đây
                },
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
