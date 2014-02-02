/* Gruntfile.js
 * Mike Erickson
 * codedungeon@gmail.com
 * Twitter: @codedungeon
 */

module.exports = function(grunt){
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		conf: {
			js_files: 'dev/js/**/*.js',
			css_files: 'dev/css/**/*.css',
			css_path: 'dist/css/',
			less_files: 'dev/less/**/*.less'
		},
		less: {
			compile: {
				files: {
					'dist/css/main.css': 'dev/less/main.less'
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'dist/js/app.min.js': '<%= conf.js_files %>'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'<%= conf.css_path %>app.css': ['<%= conf.css_files%>']
				}
			},
			minify: {
				expand: true,
				cwd: '<%= conf.css_path %>',
				src: ['*.css', '!*.min.css'],
				dest: '<%= conf.css_path %>',
				ext: '.min.css'
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: ['<%= conf.js_files %>', 'test/**/*.js']
		},
		watch: {
			less: {
				files: ['<%= conf.less_files %>'],
				tasks: ['less','cssmin']
			},
			css: {
				files: ['<%= conf.css_files %>'],
				tasks: ['cssmin']
			},
			js: {
				files: ['<%= conf.js_files %>'],
				tasks: ['uglify','jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default',['less','cssmin','uglify']);
};