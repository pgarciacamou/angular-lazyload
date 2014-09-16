module.exports = function (grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		,uglify: {
			options: {
				mangle: true
				,beautify: false
				,banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			}
			,all: {
				files: {
					'dist/angular-lazyload/angular-lazyload.min.js': ['src/angular-lazyload/lazyload.js']
				}
			}
		}
	});
};