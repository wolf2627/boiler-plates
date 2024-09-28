const sass = require('node-sass');
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'../js/*.js',
					'../js/**/*.js' //You can add multiple js file locations
				],
				dest: '../../htdocs/js/app.js'
			},
		},

		uglify: {
			options: {
				mangle: false,
				compress: false,
				beautify: false,
				SourceMap: true,
				SourceMapIncludeSources: true,
				SourceMapIn: '../../htdocs/js/app.js.map',
			},
			build: {
				files: {
					'../../htdocs/js/app.min.js': ['../../htdocs/js/app.js']
				}
			}
		},

		obfuscator: {
			options: {
				banner: '',
				debugProtection: true,
				debugProtectionInterval: true,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 1,
				disableConsoleOutput: true,
				mangle: true,
				selfDefending: true,
				domainLock: [
					'domain you want to lock',
					'you can add mutiple domain'
				]
			},
			build: {
				files: {
					'../../htdocs/js/app.o.js': [
						'../../htdocs/js/app.js',
					]
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['/your_file_path'], //setup with proper path
						dest: '../../htdocs/destination_path' //setup with proper path
					}
				]
			}
		},

		sass: {
			options: {
				style: 'compressed',
				sourceMap: false,
				implementation: sass,
				includePaths: [
					'node_modules'
				]
			},
			dist: {
				files: {
					'../../htdocs/css/app.css': '../sass/app.scss',
				}
			}
		},

		watch: {
			scripts: {
				files: [
					'Gruntfile.js',
					'../js/*.js',
					'../js/**/*.js',
				],
				tasks: ['concat', 'uglify:build', 'obfuscator'],
				options: {
					debounceDelay: 300
				}
			},
			css: {
				files: [
					'../sass/**/*.scss',
					'../sass/**/*.sass',
				],
				tasks: ['sass'],
				options: {
					debounceDelay: 300,
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-obfuscator');
	grunt.registerTask('default', ['sass:dist', 'concat', 'uglify', 'watch']);
	grunt.registerTask('build', ['sass:dist', 'concat', 'uglify', 'obfuscator']);
};

/* EOF */
