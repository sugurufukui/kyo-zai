const TerserPlugin = require("terser-webpack-plugin");

module.exports = function override(config, env) {
  // 既存のTerserPluginを見つける
  const terserPluginIndex = config.optimization.minimizer.findIndex(
    (plugin) => plugin.constructor.name === "TerserPlugin"
  );

  // TerserPluginが見つかった場合、設定を更新
  if (terserPluginIndex !== -1) {
    config.optimization.minimizer[terserPluginIndex] = new TerserPlugin({
      terserOptions: {
        compress: {
          // drop_console: env === "production",
          drop_console: false,
        },
      },
    });
  }

  return config;
};
