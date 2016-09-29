const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat-css');
const gutil = require('gulp-util');
const sass = require('gulp-sass');

const siteRoot = '_site';
const cssFiles = './_sass/**/*.scss';

const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const runSequence = require('run-sequence');

gulp.task('css', () => {

  var processors = [
      autoprefixer({
          browsers: 'last 2 version'
      }),
      pxtorem({
        replace: false,
        rootValue: 16,
        unitPrecision: 5,
        propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing']
      })
  ];

  return gulp.src('./_assets/css/main.scss')
    .pipe(sass({
      outputStyle: 'compact',
      trace: true
    }).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(gulp.dest('_assets/css/'))
    .pipe(gulp.dest('_site/_assets/css/'))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    // '--drafts',
    '--config',
    '_config.yml'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  // browserSync.init({
  //   files: [siteRoot + '/**'],
  //   port: 4000,
  //   server: {
  //     baseDir: siteRoot
  //   }
  // });

  browserSync.init({
      server: siteRoot,
      port: 4000,
      ghostMode: false, // do not mirror clicks, reloads, etc. (performance)
      logFileChanges: true,
      logLevel: 'debug',
      open: false       // do not open the browser
    });



  gulp.watch(cssFiles, ['css']);
});

gulp.task('default', function(callback) {
  runSequence(
    'jekyll',
    ['css'],
    'serve',
    callback);
});
