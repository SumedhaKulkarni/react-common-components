export default {
  themeConfig: {
    showPlaygroundEditor: true,
  },
  typescript: true,
  dest: '/docz-dist',
  modifyBundlerConfig: (bundlerConfig) => {
    const rules = [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  },
};
