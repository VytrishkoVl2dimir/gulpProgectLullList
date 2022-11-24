
const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));  //даний плагін перетворює файли scss в css
const concat = require('gulp-concat'); //даний плагін виконує конкатанацію (зжимання в одну строку) результуючий css файл
const browserSync = require('browser-sync').create(); //даний плагін виконує автоматичне оновлення сторінки
const uglify = require('gulp-uglify-es').default; //даний плагін виконує стискання файлів
const autoprefixer = require('gulp-autoprefixer'); //даний плагін добавляє стилі для інших браузерів
const imagemin = require('gulp-imagemin'); //даний плагін стискає картинки Потрібно встановлювати: npm install gulp-imagemin@7.1.0
const del = require('del'); //даний плагін видаляє непотрібні файли в папці готових файлів dist. Потрібно встановлювати: npm install del@6.1.1



function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	})
}

function cleanDist() {
	return del('dist')
}

function images() {
	return src('app/images/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/images'))
}

function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/slick-carousel/slick/slick.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))//виконуємо конкатанацію в файл min.js
		.pipe(uglify())//виконуємо стискання файлу
		.pipe(dest('app/js'))//переміщуємо в папку js
		.pipe(browserSync.stream())//Оновлюємо сторінку
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function build() {
	return src([
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/*.html'
	], { base: 'app' })
		.pipe(dest('dist'))
} // Дана функція build збирає всі вказані в ній файли та переносить їх в папку dist

// Наступна функція виконує слідкування в за змінами в файлах і авторматично запускає функцію, яка вказана після коми
function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts); //Слідкуємо за всіма файлами js окрім файла, перед яким стоїть знак оклику
	watch(['app/*.html']).on('change', browserSync.reload);
}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching); // Прописана можливість при введенні в терміналі по дефолту слова "gulp", паралель запускались функції, які вказані в дужках.