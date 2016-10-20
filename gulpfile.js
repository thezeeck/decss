var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel'),
    //cssmin = require('gulp-cssmin'),
    //rename = require('gulp-rename'),
    config = {
      style: {
        main: './app/sass/app.scss',
        watch: './app/**/*.scss',
        test: './test/css',
        prod: './prod/css'
      },
      html: {
        watch: './app/*.html'
      },
      js: {
        main: './app/js/app.js',
        watch: './app/js/**/*.js',
        test: './test/js',
        prod: './prod/js'
      },
      jade: {
        main: './app/index.jade',
        lib: './app/views/**/*.jade',
        watch: './app/**/*.jade',
        test: './test',
        prod: './prod'
      }
    };

gulp.task('server', function () {
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      livereload: true
    }));
});

gulp.task('build:css', function () {
  return gulp.src(config.style.main)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(config.style.test));
});

gulp.task('build:js', function() {
	return gulp.src(config.js.main)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.js.test));
});

gulp.task('build:jade', function() {
  return gulp.src(config.jade.main)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.test));
});

gulp.task('build:sections', function() {
  return gulp.src(config.jade.lib)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.test));
});

gulp.task('watch', function() {
  gulp.watch(config.js.watch, ['build:js']);
  gulp.watch(config.style.watch, ['build:css']);
  gulp.watch(config.jade.watch, ['build:jade']);
});

gulp.task('build', ['build:css', 'build:js', 'build:jade', 'build:sections'])

gulp.task('default', ['server', 'watch', 'build']);
