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
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/jquery/dist/',
                    src: ['jquery.js'],
                    dest: 'dist/js'
                }]
            }
        },

		htmlbuild: {
			dist: {
				src: '<%= assetsPath %>/html/index.html',
				dest: 'dist/',
				options: {
					beautify: true,
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
						layout: {
							header: '<%= assetsPath %>/html/layout/header.html',
							footer: '<%= assetsPath %>/html/layout/footer.html'
						}
					},
					// data: {
					// 	// Data to pass to templates
					// 	version: "0.1.0",
					// 	title: "test",
					// },
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
	grunt.registerTask( 'default', [ 'sass', 'requirejs', 'copy', 'htmlbuild' ]);
	grunt.registerTask( 'css', [ 'sass' ]);
	grunt.registerTask( 'js', [ 'requirejs' ]);
	grunt.registerTask( 'html', [ 'htmlbuild' ]);

};