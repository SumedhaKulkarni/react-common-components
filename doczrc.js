export default {
  themeConfig: {
    showPlaygroundEditor: true,
  },
  typescript: false,
  dest: '/docz-dist',
  modifyBundlerConfig: (bundlerConfig) => {
    const rules = [
      {
        test: /\.(css|scss)$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  },
};
