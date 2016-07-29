var gulp = require('gulp');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var $    = require('gulp-load-plugins')();

var sassPaths = [
  './app/bower_components/foundation-sites/scss',
  './app/bower_components/motion-ui/src'
];


// reload localhost on any changes to html or css in /app
gulp.task("serve", function(){
  browserSync({
    server: {
      baseDir: "app"
    }
  });
  gulp.watch(["*.html", "styles/*.css"], {cwd: "app"}, reload)
});


gulp.task('sass', function() {
  return gulp.src('./app/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./app/styles'));

});

gulp.task('sasswatch', ['sass'], function() {
  gulp.watch(['./app/scss/**/*.scss'], ['sass']);
});
