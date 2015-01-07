if (typeof console === 'undefined' || typeof console.log === 'undefined') {
    console = {
        log: function(o){},
        dir: function(o){}
    };
}

log = function(o){ console.log(o); };
dir = function(o){ console.dir(o); };

require.config({

    urlArgs: 'cache='+(new Date()).getTime(),

    baseUrl: '../js/app',

    paths: {
        jquery: '../../vendor/jquery/dist/jquery',
        TweenMax: '../../vendor/gsap/src/uncompressed/TweenMax',
        underscore: '../../vendor/underscore/underscore',
        backbone: '../../vendor/backbone/backbone',
        text: '../../vendor/requirejs-text/text',
        unity: '../../vendor/unity/UnityObject2'
    },

    shim: {
        jquery: {
            exports: '$'
        },

        TweenMax: {
            exports: 'TweenMax'
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            exports: 'Backbone',
            deps: [
                'underscore',
                'jquery'
            ]
        },

        unity: {
            exports: 'UnityObject2'
        }
    },

    deps: [
        'bootApplication'
    ]

});
