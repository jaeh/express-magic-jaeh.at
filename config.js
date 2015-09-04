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
  {href: '#♥', text: 'about', title:'What we are'},
  {href: '#wizards', text: 'wizards', title: 'Who we are'},
  {href: '#at', text: 'at', title: 'Where we are'},
  {href: '#work', text: 'work', title: 'What we do'},
  {href: '#contact', text: 'contact', title: 'How we communicate'},
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
  CNAME: 'magicshifter.net',
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
    wizards: [
      {
        nick: 'wizard23',
        slug: 'wizard23',
        firstname: 'philipp',
        lastname: 'tiefenbacher',
        url: 'http://wizards23.net',
        job: 'ceo',
      },
      {
        nick: 'jascha',
        slug: 'jascha',
        firstname: 'jascha',
        lastname: 'ehrenreich',
        url: 'https://jaeh.at',
        job: 'webdev',
      },
      {
        nick: 'tompeak',
        slug: 'tompeak',
        firstname: 'tom',
        lastname: 'peak',
        url: 'http://tompeak.com',
        job: 'webdev, gfx'
      }
    ],
    at: [
      {
        name: 'metalab',
        url: 'https://metalab.at',
        img: 'metalab.png',
      },
      {
        name: 'hackerspaceshop',
        url: 'http://hackerspaceshop.com',
        img: 'hackerspaceshop.png',
      },
      {
        name: 'raumzeitlabor',
        url: 'http://raumzeitlabor.de',
        img: 'raumzeitlabor.png',
      },
    ],
    work: [
      {
        name: 'magicshifter',
        img: 'magicshifter.jpg',
        url: 'http://magicshifter.net',
        description: [
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
        ],
      },
      {
        name: 'evocell',
        img: 'evocell.jpg',
        url: 'https://wizard23.github.io/evocell/cellspace.html',
        description: [
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
        ],
      },
      {
        name: 'printables',
        img: 'printables.jpg',
        url: 'http://www.thingiverse.com/wizard23/designs',
        description: [
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
          'lorem ipsum dolor sit amet',
        ],
      },
    ],
    contact: {
      email: 'team@magicshifter.net',
    },
  },
};
