const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      react: path.resolve(__dirname,"./node_modules/react"),
    }
  }
  return config;
};
