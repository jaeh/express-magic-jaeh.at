var join = require('path').join;

var src = 'src';
var build = 'build';
var appcache = 'manifest.appcache';

var dirs = {
  cwd: __dirname,
  src: join(__dirname, src),
  out: join(__dirname, build),
  js: 'js',
  css: 'css',
  html: 'html',
  assets: 'assets',
  config: join(__dirname, 'config'),
  img: 'img',
  pages: 'pages',
  gulp: 'gulp',
  favicon: 'favicon.ico',
  logs: join(__dirname, 'logs'),
};

var env = process.env.NODE_ENV || 'development';

var menuItems = [
  {href: '#♥', text: 'about', title:'Who i am'},
  {href: '#projects', text: 'projects', title: 'What i do'},
  {href: '#networks', text: 'networks', title: 'My networks'},
  {href: '#contact', text: 'contact', title: 'How you can reach me'},
];

var server = {
  // Files to exclude from static serving,
  // relative to out directory
  files: '!(server.js|config.js)',
  dirs: {
    img: '/' + dirs.img + '/',
    js: '/' + dirs.js + '/',
    css: '/' + dirs.css + '/',
  },
};

module.exports = {
  CNAME: 'jaeh.at',
  port: 1337,
  pages: '/ /index.html',
  pageItems: {
    '/': '/index.html',
    '/%E2%99%A5': '/index.html',

  },
  menuItems: menuItems,
  env: env,
  dirs: dirs,
  files: {
    css: join(dirs.src, '**', dirs.css, '@(main.styl|*.main.styl)'),
    js: {
      // index:  dirs.js,
    },
    html: [
      {
        src: join(dirs.src, dirs.html, dirs.pages, '*.jade'),
        out: dirs.out,
      },
    ],
    copy: '!(*.xcf|*.psd|*.ai)',
    server: 'server.js',
    compress: '!(*.ico|*.gz)',
  },
  config: {
    babelrc: 'babelrc',
    jaderc: 'jadelintrc',
    jscsrc: 'jscsrc',
    stylintrc: 'stylintrc',
  },
  watch: {
    src: src,
    appcache: appcache,
    tasks: [
      {
        src: join(dirs.src, dirs.js, '**', '*.js'),
        tasks: ['build:js'],
      },
      {
        src: join(dirs.src, dirs.css, '**', '*.styl'),
        tasks: ['build:css'],
      },
      {
        src: join(dirs.src, dirs.html, '**', '*.jade'),
        tasks: ['build:html'],
      },
      {
        src: join(dirs.config, '*'),
        tasks: ['build'],
      },
      {
        src: 'config.js',
        tasks: ['build'],
      },
      {
        src: join(dirs.src, dirs.assets, '**', '*'),
        tasks: ['build:copy'],
      },
      {
        src: join(dirs.src, appcache),
        tasks: ['build:appcache'],
      }
    ],
  },
  server: server,
  copy: [
    {
      src: join(dirs.src, dirs.assets, '**'),
      out: join(dirs.out),
    },
  ],
  locals: {
    env: env,
    menuItems: menuItems,
    dirs: server.dirs,
    contact: {
      email: 'jascha@jaeh.at',
    }
  }
};
