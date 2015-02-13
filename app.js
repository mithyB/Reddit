(function (moduleId, ng) {
    'use strict';

    var app = ng.module(moduleId, [
        'ngRoute',
        module
    ]);

    function module($rootScopeProvider, $locationProvider){
        $rootScopeProvider.digestTtl(25); // to prevent Error: error:infdig - Infinite $digest Loop (comment recursion)
        //$locationProvider.html5Mode(true)
    }

    app.run(['$route', main])

    function main($route) {
        $route.reload();
    }

})('app', angular);
