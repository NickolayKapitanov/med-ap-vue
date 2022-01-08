const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, "./dist"),
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Medical programm';

        return args;
      });
  },
};