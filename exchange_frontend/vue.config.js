module.exports = {
    configureWebpack: {
        devtool: "source-map"
    },

    pwa: {
        name: "GetCrypto24",
        themeColor: "#ffd600",
        msTileColor: "#ffd600",
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
