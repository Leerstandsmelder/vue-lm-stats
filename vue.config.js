module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-lm-stats'
  : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true
    }
  }
}
