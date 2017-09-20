module.exports = grunt => {
  grunt.initConfig({
    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: [{
          src: '*.pug',
          cwd: 'src/pug/',
          dest: 'dist',
          expand: true,
          ext: '.html'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          src: '*.sass',
          cwd: 'src/sass/',
          dest: 'dist/css',
          expand: true,
          ext: '.css'
        }]
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/js/app.min.js': ['src/js/app.js']
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
            src : [
                'dist/**.*'
            ]
        },
        options: {
            watchTask: true,
            server: './dist'
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
    
          // includes files within path and its sub-directories
          {expand: true, cwd:'src/', src: ['images/**', 'fonts/**'], dest: 'dist'},
    
          // makes all src relative to cwd
          // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
    
          // flattens results to a single level
          // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ],
      },
    },
    watch: {
      copy: {
        files: ['src/images/**/*'],
        tasks: ['copy']
      },
      pug: {
        files: ['src/pug/**/*.pug'],
        tasks: ['pug']
      },
      sass: {
        files: ['src/sass/**/*.sass'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify']
      }
    }
  });

  // initial
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  let tasks = []
  //register default task
  if(process.env.NODE_ENV != 'production')
  {
    tasks = ['pug', 'sass', 'uglify', 'copy', 'browserSync', 'watch'];
  }else
  {
    tasks = ['pug', 'sass', 'uglify', 'copy'];
  }

  grunt.registerTask('default', tasks)
};

