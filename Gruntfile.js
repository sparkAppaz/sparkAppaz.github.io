module.exports = function(grunt) {

  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'out/css/style.css': 'src/css/main.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ["src/css/*.scss", "src/css/modules/*.scss", "src/css/modules/common/*.scss"],
        tasks: ["sass"],
        options: {
          nospwan: true
        }
      },

      jshint: {
        files: ['out/js/*.js'],
        tasks: ["jshint"],
        options: {
          nospwan: true
        }
      }
    },

    develop: {
      server: {
        file: 'server.js'
      }
    },

    jshint: {
      myFiles: ['out/js/*.js']
    },

    exec: {
      run: {
        cmd: 'node server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('default', []);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('css', ['sass']);


  grunt.registerTask('serve', ['sass', 'jshint', 'develop', 'watch']);

};