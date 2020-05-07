const { series, src, dest, task, watch } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

const bs = function (cb) {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });
  cb();
};

const buildSass = function (cb) {
  src("src/sass/*.scss").pipe(sass()).pipe(dest("build"));
  cb();
};

const watchFiles = series(bs, buildSass, function () {
  watch("src/sass/*.scss", buildSass);
  watch("build/*.html").on("change", browserSync.reload);
  watch("build/*.css").on("change", browserSync.reload);
});

exports.watchFiles = watchFiles;
exports.bs = bs;
exports.buildSass = buildSass;
exports.default = watchFiles;
