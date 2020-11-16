// vue.config.js for less-loader@6.0.0

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#74b1be',
            'link-color': '#9feaf9',
            //'btn-border-radius-sm': '0px',
            //'btn-border-radius-base': '0px',还是有个圆角好看一点
            'card-radius': '10px',
            //'text-color-secondary-dark': '#2f3241'
            'menu-dark-bg': '#2f3241'
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
};