const { addAfterLoader, loaderByName } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the source-map-loader rule
      const sourceMapLoaderRule = webpackConfig.module.rules.find(
        rule => rule.use && rule.use.some && 
        rule.use.some(use => use.loader && use.loader.includes('source-map-loader'))
      );

      // Add exclusion for html5-qrcode package
      if (sourceMapLoaderRule) {
        sourceMapLoaderRule.exclude = [
          ...(sourceMapLoaderRule.exclude || []),
          /node_modules[\\/]html5-qrcode/
        ];
      }

      return webpackConfig;
    }
  }
};