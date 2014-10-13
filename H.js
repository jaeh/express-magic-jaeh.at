'use strict';

var express = require('express')
  , H = express()
  , hosts = {
      development: [
        'jaeh.test'
      , 'jaeh.t'
      ]
    , production: [
        'jaeh.at'
      ]
  }
;

//this is the only needed setting
H.set( 'hosts', hosts[H.get('env')] );

module.exports = H;
