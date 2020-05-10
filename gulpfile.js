const { series, src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

const bs = function (cb) {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
    browser: "chrome",
    // open: false
  });
  cb();
};

const cleanup = function (cb) {
  src(["./public/assets/css", "./public/assets/js"], {
    read: false,
    allowEmpty: true,
  }).pipe(clean());
  cb();
};

const buildSass = function (cb) {
  src("public/src/sass/*.scss").pipe(sass()).pipe(dest("public/assets/css"));
  cb();
};

const scriptMerge = function (cb) {
  src("public/src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest("public/assets/js"));
  cb();
};

const watchFiles = series(bs, buildSass, function (cb) {
  watch("public/src/sass/*.scss", buildSass);
  watch("public/src/js/*.js", scriptMerge);
  watch("public/assets/**/*.*").on("change", browserSync.reload);
  watch("public/**/*.html").on("change", browserSync.reload);
  cb();
});

exports.scriptMerge = scriptMerge;
exports.cleanup = cleanup;
exports.watchFiles = watchFiles;
exports.bs = bs;
exports.buildSass = buildSass;
exports.default = series(cleanup, scriptMerge, watchFiles);
