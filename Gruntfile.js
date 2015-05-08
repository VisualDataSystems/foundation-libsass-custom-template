module.exports = function(grunt) {

    // Auto load plugins
    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Initial setup - copy required scripts and files from bower_compoments into project directory
        copy: {
            javascript: {
                files: [
                    {
                        expand: true, 
                        flatten: true,
                        cwd: 'bower_components/', 
                        src: ['modernizr/modernizr.js', 'jquery/dist/jquery.min.js', 'foundation/js/foundation.min.js'], 
                        dest: 'javascript/'
                    },
                ],
            },
            sass: {
                files: [
                    {
                        expand: true,
                        flatten: true, 
                        cwd: 'bower_components/foundation/scss/',
                        src: ['foundation/_settings.scss'],
                        dest: 'scss/'
                    },
                ],
            },
        },
        
        // Javascript linter
        jshint: {
            all: ['Gruntfile.js', 'javascript/*.js']
        },

        // Minify scripts
        uglify: {
            options: {
            	mangle: false
            },
            app: {
                files: {
                    'javascript/app.min.js': ['javascript/app.js']
                }
            }
        },

        // Compile SASS
        sass: {
            options: {
                includePaths: ['bower_components/foundation/scss']
            },
            // Production
            production: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: { 
                    'css/*.min.css': 'scss/*.scss' 
                }
            },
            // Development
            development: {
            	options: {
                    outputStyle: 'expanded',
                    sourceMap: true
            	},
            	files: {
                    'css/*.css': 'scss/*.scss' 
            	}
            }
        },

        // Watch and live reload
        watch: {
            sass: {
                files: ['scss/*.scss', 'scss/*/*.scss'],
                tasks: ['sass:development']
            },
            other: {
                files: ['*.html', '*.htm', 'javascript/*.js']
            },
            // Live reload on file changes
            options: { 
                livereload: true 
            }
        }
    });

    //Default task(s)
    grunt.registerTask('livereload', ['watch']);
    grunt.registerTask('checkjs', ['jshint']);
    grunt.registerTask('setup', ['copy', 'sass'])
    grunt.registerTask('default', ['uglify', 'sass']);
};