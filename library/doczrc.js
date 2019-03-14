/* eslint-disable */
import { css } from 'docz-plugin-css'; 
export default {
  themeConfig: {
    showPlaygroundEditor: true,
  },
  dest: '/docz-dist',
  plugins: [
    css({
      preprocessor: 'postcss'
    }),
  ],
};
