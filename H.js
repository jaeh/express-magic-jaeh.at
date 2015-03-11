import express from 'express';

var H = express();

H.set('404redirect', '/404');

module.exports = H;
