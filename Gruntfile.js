let matchdep = require( 'matchdep' );
let mergeFiles = require( './grunt-scripts/mergeFiles' );

module.exports = function ( grunt ) {

    // Pull defaults (including username and password) from .screeps.json
    const config = require( './.screeps.json' )

    // Allow grunt options to override default configuration
    const email = grunt.option( 'email' ) || config.email;
    const password = grunt.option( 'password' ) || config.password;
    const branch = grunt.option( 'branch' ) || config.branch;
    const ptr = grunt.option( 'ptr' ) ? true : config.ptr

    // Load needed tasks
    matchdep.filterAll( [ 'grunt-*', '!grunt-cli' ] ).forEach( grunt.loadNpmTasks );

    mergeFiles( grunt );

    grunt.initConfig( {
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr,
            },
            dist: {
                src: [ 'dist/*.js' ]
            }
        },

        copy: {
            main: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                cwd: 'dist/',
                src: '**',
                dest: 'Update This Path'
            },
        },
    } );

    grunt.registerTask( 'main', [ 'test', 'merge', 'write' ] );
    grunt.registerTask( 'sandbox', [ 'merge', 'write-private' ] );
    grunt.registerTask( 'merge', 'mergeFiles' );
    grunt.registerTask( 'write', 'screeps' );
    grunt.registerTask( 'write-private', 'copy' );
};