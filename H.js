'use strict';
var express = require('express')
  , H = express()
;
H.set('404redirect', '/404');
H.set('blogRoot', '/blog');

module.exports = H;
