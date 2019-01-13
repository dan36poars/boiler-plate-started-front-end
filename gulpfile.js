"use strict";

const 	gulp        = require('gulp'),
		browserSync = require('browser-sync'),
		jade        = require('gulp-jade'),
		prefix      = require('gulp-autoprefixer'),
		sass        = require('gulp-sass'),
		imagemin    = require('gulp-imagemin'),	
		babel 		= require('gulp-babel'),
		concat      = require('gulp-concat'),
		sourcemaps  = require('gulp-sourcemaps'),
		uglifyJS    = require('gulp-uglify');

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
	babelJs: 'babel-js',
	popper: 'popper',
	normalize: 'normalize',
	slickCss: 'slick-css',
	slickJs: 'slick-js',
	slickFonts: 'fonts-slick',
	scrollReveal: 'scroll-reveal'
};

/*
* ScrollReveal
*/
gulp.task('scroll-reveal', () => {
	return gulp.src('node_modules/scrollreveal/dist/scrollreveal.min.js')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.js))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Slick Css
*/
gulp.task('slick-css', () => {
	return gulp.src(['node_modules/slick-carousel/slick/slick.scss', 'node_modules/slick-carousel/slick/slick-theme.scss'])
	.pipe(gulp.dest( paths.sass ))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Slick Js
*/
gulp.task('slick-js', () => {
	return gulp.src('node_modules/slick-carousel/slick/slick.min.js')
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest( paths.js ))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Fonts Slick
*/
gulp.task('fonts-slick', () => {
	return gulp.src('node_modules/slick-carousel/slick/fonts/*')
	.pipe(gulp.dest(paths.fonts + '/fonts-slick'));
});


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
		.pipe(prefix(['last 2 versions', '> 1%', 'ie 11']))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({stream: true}));
		browserSync.reload();
});

/*
* ImageMin
*/
gulp.task('imageMin', function(){
	gulp.src('images/**/*')
    .pipe(imagemin([], { verbose: true }))
    .pipe(gulp.dest('www/images'))
    .pipe(browserSync.reload({stream: true}));
});

/*
* Create the normalize file SCSS
*/
gulp.task('normalize', ()=>{
	return gulp.src('node_modules/normalize-scss/sass/**/*')
	.pipe(gulp.dest( paths.sass ))
	.pipe(browserSync.reload({stream: true}));
});

/*
* Babel
*/
gulp.task('babel-js', () => {
	return gulp.src(['node_modules/babel-polyfill/dist/polyfill.js','js/**/*.js'])
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(concat('all.js'))
	.pipe(uglifyJS())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest( paths.js ))
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
	browserSync.reload({stream: true});
});



gulp.task('browser-sync',[ 
	load.fontAwesome, 
	load.fontsFontAwesome,	
	load.jqueryMigrate,
	load.jquery,
	load.fonts,
	load.jade,
	load.normalize,	
	load.slickCss,
	load.slickJs,
	load.slickFonts,
	load.scrollReveal,
	load.sass,
	load.imageMin,
	load.babelJs	
	]
	, () => {
	browserSync({
		server: './www',
		notify: false,
		browser: false
	});
});

gulp.task('watch', () => {
	gulp.watch(paths.sass + '/**/*.scss', ['sass']);
	gulp.watch(paths.jade + '/**/*.jade', ['jade-rebuild']);
	gulp.watch('images/**/*', ['imageMin']);
	gulp.watch('js/**/*', ['babel-js']);
	gulp.watch('fonts/**/*', ['fonts']);
});

gulp.task('default', ['browser-sync', 'watch']);



