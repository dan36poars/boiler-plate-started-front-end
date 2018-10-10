"use strict";

const 	gulp        = require('gulp'),
		browserSync = require('browser-sync'),
		jade        = require('gulp-jade'),
		prefix      = require('gulp-autoprefixer'),
		sass        = require('gulp-sass'),
		imagemin    = require('gulp-imagemin'),
		sourcemaps  = require('gulp-sourcemaps');

const paths = {
	root: 'www',
	sass: 'build/sass',
	jade: 'build/jade',
	css: 'www/css',
	js: 'www/js',
	fonts: 'www/fonts'
};

/* Loading tasks */
const load = {
	fontAwesome: 'font-awesome',
	fontsFontAwesome: 'fonts-font-awesome',
	bootstrapCss : 'bootstrap-css',
	bootstrapJs: 'bootstrap-js',
	jqueryMigrate: 'jquery-migrate',
	jquery: 'jquery',
	fonts: 'fonts',
	jade: 'jade',
	sass: 'sass',
	imageMin: 'imageMin',
	customJs:  'custom-js',
	popper: 'popper',
	normalize: 'normalize'
};

/*
* Font-AweSome
*/
gulp.task('font-awesome', ()=> {
	return gulp.src('node_modules/font-awesome/scss/font-awesome.scss')
	.pipe(sass({
		includePaths: 'node_modules/font-awesome/scss',
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.css))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Fonts-Font-awesome
*/
gulp.task('fonts-font-awesome', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest(paths.fonts + '/fonts-awesome'));
});

/*
* Bootstrap-CSS
*/
gulp.task('bootstrap-css', () => {
	return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
	.pipe(sass({
		includePaths: 'node_modules/bootstrap/scss',
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.css))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Bootstrap-JS
*/
gulp.task('bootstrap-js', function(){
	return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Jquery-migrate
*/
gulp.task('jquery-migrate', function(){
	return gulp.src('node_modules/jquery-migrate/dist/jquery-migrate.min.js')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Jquery
*/
gulp.task('jquery', function(){
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Popper.js
*/
gulp.task('popper', function(){
	return gulp.src('node_modules/popper.js/dist/popper.min.js')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Fonts
*/
gulp.task('fonts', () => {
	return gulp.src('fonts/**/*')
	.pipe(gulp.dest( paths.fonts ))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Jade
*/
gulp.task('jade', () => {
	return gulp.src(paths.jade + '/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(paths.root))
		.pipe(browserSync.reload({stream: true}));
});

/*
* Sass
*/
gulp.task('sass', () => {
	return gulp.src(paths.sass + '/*.scss')
		.pipe(sass({
			includePaths: [paths.sass],
			outputStyle: 'compressed'
		}))
		.on('error', sass.logError)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({stream: true}));
});

/*
* ImageMin
*/
gulp.task('imageMin', function(){
	gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('www/img'))
    .pipe(browserSync.reload({stream: true}));
});

/*
* Create the normalize file SCSS
*/
gulp.task('normalize', ()=>{
	return gulp.src('node_modules/normalize-scss/sass/normalize/*.scss')	
	.pipe(gulp.dest(paths.sass + '/normalize'))
	gulp.src('node_modules/normalize-scss/sass/*.scss')
	.pipe(gulp.dest( paths.sass ))
	.pipe(browserSync.reload({stream: true}));
});


/*
* Custom Js
*/
gulp.task('custom-js', ()=>{
	return gulp.src('js/*')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('www/js'))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Rebuild Jade Files
*/
gulp.task('jade-rebuild', ['jade'], ()=> {
	browserSync.reload();
});

/*
* Reload the Brower Sync
*/
gulp.task('browser-reload', ()=> {
	browserSync.reload();
});



gulp.task('browser-sync',[ 
	load.fontAwesome, 
	load.fontsFontAwesome,
	load.bootstrapCss,
	load.bootstrapJs,
	load.jqueryMigrate,
	load.jquery,
	load.fonts,
	load.jade,
	load.normalize,
	load.sass,
	load.imageMin,
	load.customJs,
	load.popper
	]
	, () => {
	browserSync({
		server: './www',
		notify: false,
		browser: false
	});
});

gulp.task('watch', () => {
	gulp.watch(paths.sass + '/*.scss', ['sass']);
	gulp.watch(paths.jade + '/**/*.jade', ['jade-rebuild']);
	gulp.watch(paths.js + '/*.js', ['browser-reload']);
	gulp.watch('img/*', ['imageMin']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('fonts/**/*', ['fonts']);
});

gulp.task('default', ['browser-sync', 'watch']);



