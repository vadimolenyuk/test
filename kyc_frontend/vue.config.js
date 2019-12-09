module.exports = {
    pwa: {
        name: "Account&KYC App",
        themeColor: "#3063c8",
        msTileColor: "#3063c8",
        workboxOptions: {
            skipWaiting: true
        }
    },

    pluginOptions: {
        i18n: {
            locale: "en",
            fallbackLocale: "en",
            localeDir: "locales",
            enableInSFC: false
        }
    },

    productionSourceMap: false,

    css: {
        sourceMap: true
    }
}
