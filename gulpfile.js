const gulp = require("gulp");
const sass = require("gulp-sass");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify-es").default;

const browserSync = require("browser-sync").create();

//compile css to scss
function style() {
  //find my css file
  return (
    gulp
      .src("./src/scss/**/*.scss")

      //pass that file to sass compiler
      .pipe(sass().on("error", sass.logError))

      //save compiled css
      .pipe(gulp.dest("./dist/assets/css/"))

      //stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return gulp
    .src("./src/js/**/*.js", { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("./dist/assets/js"));
}

// function scripts() {
//   return gulp
//     .src(paths.scripts.src, { sourcemaps: true })
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(concat("main.min.js"))
//     .pipe(gulp.dest(paths.scripts.dest));
// }
// gulp.task("uglify", function () {
//   return gulp
//     .src("./src/js/**/*.js")
//     .pipe(uglify(/* options */))
//     .pipe(gulp.dest("./dist/assets/js"));
// });

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./dist/*.html").on("change", browserSync.reload);
  gulp.watch("./dist/assets/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.scripts = scripts;
exports.watch = watch;
