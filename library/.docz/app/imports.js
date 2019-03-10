export const imports = {
  'src/core/atoms/Button/Button.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-core-atoms-button-button" */ 'src/core/atoms/Button/Button.mdx'),
}
