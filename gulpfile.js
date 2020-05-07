const { series, src, dest, task, watch } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const rename = require("gulp-rename");

const bs = function (cb) {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
    browser: "chrome",
    // open: false
  });
  cb();
};

const copyFiles = function (cb) {
  src("./src/index.html")
    .pipe(rename({ dirname: "./" }))
    .pipe(dest("./build"));
  cb();
};

const cleanup = function (cb) {
  src("./build", { read: false, allowEmpty: true }).pipe(clean());
  cb();
};

const buildSass = function (cb) {
  src("src/sass/*.scss").pipe(sass()).pipe(dest("build"));
  cb();
};

const watchFiles = series(bs, buildSass, function (cb) {
  watch("src/sass/*.scss", buildSass);
  watch("build/*.html").on("change", browserSync.reload);
  watch("build/*.css").on("change", browserSync.reload);
  cb();
});

exports.copyFiles = copyFiles;
exports.cleanup = cleanup;
exports.watchFiles = watchFiles;
exports.bs = bs;
exports.buildSass = buildSass;
exports.default = series(copyFiles, watchFiles);
