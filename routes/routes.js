(function(moduleId, valueId, ng){
    'use strict';

    var value = [{
            url: '/',
            config: {
                controller: 'frontpage as vm',
                templateUrl: 'views/frontpage.html'
            }
        }, {
            url: '/r/:subreddit',
            config: {
                controller: 'frontpage as vm',
                templateUrl: 'views/frontpage.html'
            }
        }, {
            url: '/r/:subreddit/:sort',
            config: {
                controller: 'frontpage as vm',
                templateUrl: 'views/frontpage.html'
            }
        }, {
            url: '/r/:subreddit/comments/:id',
            config: {
                controller: 'selfpage as vm',
                templateUrl: 'views/selfpage.html'
            }
        },
        {
            url: '/u/:username',
            config: {
                controller: 'frontpage as vm',
                templateUrl: 'views/frontpage.html'
            }
        }, {
            url: '/u/:username/:sort',
            config: {
                controller: 'frontpage as vm',
                templateUrl: 'views/frontpage.html'
            }
        },
        {
            url: '/about',
            config: {
                //controller: 'about as vm',
                templateUrl: 'views/about.html'
            }
        }
    ];

    ng.module(moduleId).constant(valueId, value);

})('app', 'routes', angular)
