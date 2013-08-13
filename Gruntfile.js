module.exports = function (grunt) {
    grunt.initConfig({
        /* ... */

        // !! This is the name of the task ('requirejs')
        requirejs: {
            compile: {

                // !! You can drop your app.build.js config wholesale into 'options'
                options: {
                    baseUrl: './app/js/src',
                    name: 'metrics',
                    out: './app/js/metrics-min.js',

                    shim: {
                        math: {
                            exports: 'Math'
                        }
                    },

                    optimize: 'uglify',
                    logLevel: 0,
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./,
                    inlineText: true
                }
            }
        }
        /* ... */
    });

    // !! This loads the plugin into grunt
    grunt.loadNpmTasks('grunt-contrib-requirejs');

};