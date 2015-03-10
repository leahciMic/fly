var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/javascript/server-compile.js',
      dest: dest,
      outputName: 'sever-compile.js',
      // Additional file extentions to make optional
      extensions: [],
      // list of modules to make require-able externally
      require: []
      // See https://github.com/greypants/gulp-starter/issues/87 for note about
      // why this is 'backbone/node_modules/underscore' and not 'underscore'
    }]
  },
  production: {
    jsSrc: dest + '/*.js',
    dest: dest
  }
};