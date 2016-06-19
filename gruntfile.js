module.exports = function(grunt) {
	'use strict';
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'nested'
				},
				files: {
					'style.css': 'assets/_scss/main.scss'
				}
			}
		},

		// watch for changes and trigger tasks
		watch: {
			scss: {
				files: [ 'assets/_scss/*.scss', 'assets/_scss/**/*.scss', 'assets/_scss/**/**/*.scss' ],
				tasks: [ 'sass' ],
				options: {
					spawn: false,
					livereload: 35729
				},
			}
		},
	});

	// register task
	grunt.registerTask( 'default', [ 'sass' ]);
	grunt.registerTask( 'css', [ 'sass' ]);

};