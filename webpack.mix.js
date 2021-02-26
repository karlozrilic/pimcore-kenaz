let mix = require('laravel-mix');
require('laravel-mix-purgecss');

mix.setPublicPath('./web')

mix.sass(
	'resources/scss/main.scss',
	'web/static/css'
);
mix.js(
	'resources/js/main.js',
	'web/static/js/app.js'
);

mix.version();

// browsersync watch for files included below and proxy setup
mix.browserSync({
	files: [
		'resources/'
	],
	injectChanges: true,
    proxy: 'http://127.0.0.1:8080',
    port: 3000
});