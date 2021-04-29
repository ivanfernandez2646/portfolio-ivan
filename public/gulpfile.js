
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const translate = require('gulp-translator');

const paths = {
  scripts: {
    src: '../',
    dest: '../build/',
    imgDest: '../build/assets'
  }
};

async function reload() {
  server.reload();
}

async function copyAssets() {
  gulp.src(['assets/**/*'])
    .pipe(gulp.dest(paths.scripts.imgDest));
}

async function buildAndReload() {
  await includeHTML();
  await copyAssets();
  reload();
}

async function includeHTML() {
  const env = process.env;
  const language = (env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES).split('_')[0] || 'en';
  const translation = `translations/${language}.json`;

  return gulp.src([
      '*.html',
      '*.css',
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(translate(translation))
    .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

exports.default = async function () {
  server.init({
    server: {
      baseDir: paths.scripts.dest
    }
  });
  buildAndReload();
  gulp.watch(["*.html", "*.css", "partial/**/*.html", "assets/**/*", "translations/**/*"], 
    gulp.series(buildAndReload));
};