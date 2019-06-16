var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

// SETTINGS

var cfg = {
    scripts: {
        src: './assets/js/**/*',
        dist: './public/js/',
        filename: 'bundle.js',
        entrypoint: './assets/js/main.js'
    },
    styles: {
        src: './assets/scss/**/*',
        dist: './public/css/'
    },
    img: {
        src: './assets/img/**/*',
        dist: './public/img/'
    },
    fonts: {
        src: './assets/fonts/**/*',
        dist: './public/fonts/'
    }
};

// SCRIPTS

gulp.task('scripts', function () {
    return browserify({entries: cfg.scripts.entrypoint, debug: true})
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source(cfg.scripts.filename))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(cfg.scripts.dist))
        .pipe(browserSync.stream());
});

// COPY IMAGES

gulp.task('copy-img', function() {
    return gulp.src(cfg.img.src)
        .pipe(gulp.dest(cfg.img.dist));
});

// STYLES

gulp.task('styles', function () {
    gulp.src(cfg.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function(err) {
            console.error(err.message);
            browserSync.notify(err.message, 3000);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cfg.styles.dist))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(cfg.styles.dist))
        .pipe(browserSync.stream());
});

// FONTS

gulp.task('fonts', function () {
    gulp.src(cfg.fonts.src)
        .pipe(gulp.dest(cfg.fonts.dist));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', [
    'styles',
    'copy-img',
    'scripts',
    'fonts'
], function () {
    browserSync.init({
        server: "./public"
    });

    gulp.watch(cfg.styles.src, ['styles']);
    gulp.watch(cfg.img.src, ['copy-img']);
    gulp.watch(cfg.scripts.src, ['scripts']);
    gulp.watch(cfg.fonts.src, ['fonts']);

    // Kill watch if GulpFile edited
    gulp.watch("Gulpfile.js").on("change", () => process.exit(0));
});
