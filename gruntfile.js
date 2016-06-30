module.exports = function(grunt) {
	'use strict';
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		assetsPath: "assets",

		sass: {
			dist: {
				options: {
					style: 'nested'
				},
				files: {
					'dist/css/style.css': '<%= assetsPath %>/scss/main.scss'
				}
			}
		},

		requirejs: {
			dist: {
				options: {
					findNestedDependencies: true,
					optimize: 'none',
					baseUrl: '<%= assetsPath %>/js',
					mainConfigFile: '<%= assetsPath %>/js/config.js',
					out: 'dist/js/main.js',
					useStrict: true,
					error: function( done, err ) {
						grunt.log.errorlns( err );
						grunt.log.write('\x07');
						done();
					},
					done: function( done, output ) {
						done();						
					},
					onModuleBundleComplete: function ( data ) {
						var fs = require('fs'),
						amdclean = require('amdclean'),
						outputFile = data.path;

						fs.writeFileSync( outputFile, amdclean.clean( {
							filePath: outputFile,
							removeUseStricts: false,
							'wrap': {
								// This string is prepended to the file
								'start': ';(function( $_window, $body, $htmlBody, $ ) {\n',
								// This string is appended to the file
								'end': '\n}( jQuery( window ), jQuery( "body" ), jQuery( "html, body" ), jQuery ));'
							},
						} ) );
					}
				}
			}
		},

		copy: {
			jQuery: {
				files: [{
					expand: true,
					cwd: 'node_modules/jquery/dist/',
					src: ['jquery.js'],
					dest: 'dist/js'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					cwd: 'assets/fonts/',
					src: ['*'],
					dest: 'dist/fonts'
				}]
			},
			image: {
				files: [{
					expand: true,
					cwd: 'assets/imgs/',
					src: ['*'],
					dest: 'dist/imgs'
				}]
			},
		},

		clean: {
			build: {
				src: ['dist']
			}
		},

		htmlbuild: {
			dist: {
				src: '<%= assetsPath %>/html/*.html',
				dest: 'dist/',
				options: {
					beautify: false,
					relative: true,
					scripts: {
						main: 'dist/js/main.js',
						jquery: 'dist/js/jquery.js'
					},
					styles: {
						main: 'dist/css/style.css'
					},
					sections: {
						chapter: '<%= assetsPath %>/html/chapters/**/*.html',
						test_chapter: '<%= assetsPath %>/html/test_chapters/**/*.html',
						layout: {
							header: '<%= assetsPath %>/html/layout/header.html',
							footer: '<%= assetsPath %>/html/layout/footer.html'
						}
					}
				}
			}
		},

		notify_hooks: {
			options: {
				enabled: true,
				success: false, // whether successful grunt executions should be notified automatically
				duration: 1 // the duration of notification in seconds, for `notify-send only
			}
		},
		
		// watch for changes and trigger tasks
		watch: {
			options: {
				spawn: false,
				livereload: 35729
			},
			scss: {
				files: [ 'assets/scss/**/*.scss' ],
				tasks: [ 'css' ]
			},
			js: {
				files: [ 'assets/js/**/*.js' ],
				tasks: [ 'js' ]
			},
			html: {
				files: [ 'assets/html/**/*.html' ],
				tasks: [ 'html' ]
			}
		},
	});

	// register task
	grunt.registerTask( 'basic', [ 'clean', 'copy', 'sass', 'requirejs', 'htmlbuild' ]);
	grunt.registerTask( 'css', [ 'sass']);
	grunt.registerTask( 'js', [ 'requirejs']);
	grunt.registerTask( 'html', [ 'htmlbuild']);

	grunt.registerTask( 'default', [ 'basic' ]);
	grunt.registerTask( 'w', [ 'basic', 'watch' ]);

	grunt.task.run('notify_hooks');

};