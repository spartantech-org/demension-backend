require('core-js');
require('regenerator-runtime/runtime');
require('@babel/register')({
  extends: './.babelrc'
});
require('./src');
