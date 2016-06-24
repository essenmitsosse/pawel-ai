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
                    src: ['*.woff*'],
                    dest: 'dist/fonts'
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
				src: '<%= assetsPath %>/html/index.html',
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
						layout: {
							header: '<%= assetsPath %>/html/layout/header.html',
							footer: '<%= assetsPath %>/html/layout/footer.html'
						}
					}
				}
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
				tasks: [ 'sass' ],
				options: {
					spawn: false,
					livereload: 35729
				},
			},
			js: {
				files: [ 'assets/js/**/*.js' ],
				tasks: [ 'requirejs' ],
				options: {
					spawn: false,
					livereload: 35729
				},
			},
			html: {
				files: [ 'assets/html/**/*.html' ],
				tasks: [ 'htmlbuild' ]
			}
		},
	});

	// register task
	grunt.registerTask( 'default', [ 'clean', 'copy', 'sass', 'requirejs', 'htmlbuild' ]);
	grunt.registerTask( 'css', [ 'sass' ]);
	grunt.registerTask( 'js', [ 'requirejs' ]);
	grunt.registerTask( 'html', [ 'htmlbuild' ]);
	grunt.registerTask( 'w', [ 'default', 'watch' ]);

};