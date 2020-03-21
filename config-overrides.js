/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
const rewireLess = require('react-app-rewire-less');
// const rewireMobX = require('react-app-rewire-mobx');
// const rewireImport = require('react-app-rewire-import');

const path = require('path');
const { merge, fromPairs } = require('lodash');
const { paths, injectBabelPlugin } = require('react-app-rewired');

const craPaths = require(`${paths.scriptVersion}/config/paths`);
// const pagePlugins = require('./scripts/pages');
// const entryFunc = require('./scripts/entry');

const prefix = ''; // `/path`

// path 相关修改都应该通过修改 craPaths 实现
Object.assign(craPaths, {
  appBuild: path.resolve('output'),
  // appHtml: path.resolve('views/index.html'), // 用于绕过 cra 的检查
  // appIndexJs: path.resolve('src/js/main.js'), // 用于绕过 cra 的检查
  appSrc: path.resolve('src'),
  servedPath: `${prefix}/`, // 需 / 结尾
});

module.exports = {
  webpack(config, env) {
    config.entry.unshift('react-app-polyfill/ie11', '@babel/polyfill');
    config = merge(config, {
      output: {
        publicPath: craPaths.servedPath, // 强制处理，保证 development 时也设置 publicPath
      },
      resolve: {
        alias: {
          '@': craPaths.appSrc,
        },
      },
    });

    // disable eslint on build
    config.module.rules = config.module.rules
      .filter((rule) => rule.enforce !== 'pre');

    // config = rewireMobX(config, env);
    // config = rewireImport(config, env);
    // config = rewireLess(config, env);
    config = injectBabelPlugin([
      '@babel/plugin-proposal-decorators', {
        legacy: true,
      }], config);
    config = injectBabelPlugin([
      'styled-jsx/babel',
    ], config);
    config = rewireLess.withLoaderOptions({
      javascriptEnabled: true,
      modifyVars: fromPairs(
        require('fs').readFileSync('./src/style/theme.less', 'utf-8').split('\n')
          .map((line) => /^(@[\w-]+):\s*(.*);$/.exec(line))
          .filter((item) => item)
          .map((item) => [item[1].trim(), item[2].trim()]),
      ),
    })(config, env);

    // multi pages config
    // config.entry = entryFunc([]);
    // config.output.filename = env === 'development' ? '[name].js' : '[name].[hash:8].js';
    // config.output.chunkFilename = env === 'development' ? 'chunk.[name].js' : 'chunk.[name].[chunkhash:8].js';
    // config.plugins = config.plugins
    //   .filter(plugin => plugin.constructor.name !== 'HtmlWebpackPlugin')
    //   .concat(pagePlugins);

    // 有 server 时去掉 HotModuleReplacementPlugin
    // config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'HotModuleReplacementPlugin');

    // limit inline image size
    const imageRule = config.module.rules
      .find((item) => Array.isArray(item.oneOf)).oneOf
      .find((item) => Array.isArray(item.test) && item.test.some((t) => String(t) === '/\\.png$/'));
    imageRule.options.limit = 1024;

    if (env === 'production') {
      // 压缩图片
      const ImageminPlugin = require('imagemin-webpack-plugin').default;
      config.plugins.push(new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        pngquant: {
          quality: '95-100',
        },
      }));

      // 预加载, 用于spa
      const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
      config.plugins.push(new ScriptExtHtmlWebpackPlugin({
        preload: {
          test: /chunk\..*\.js$/,
          chunks: 'initial',
        },
        prefetch: {
          test: /.*\.js$/,
          chunks: 'async',
        },
      }));

      // const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
      // config = rewireWebpackBundleAnalyzer(config, env, {
      //   analyzerMode: 'static',
      //   reportFilename: 'report.html',
      // });
    }

    return config;
  },
  devServer(configFunction) {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      return {
        ...config,
        historyApiFallback: {
          disableDotRule: true,
          index: `${prefix}/index.html`,
        },
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:8083',
            changeOrigin: true,
          },
        },
      };
    };
  },
};
