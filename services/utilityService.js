(function (moduleId, factoryId, ng){
    'use strict';

    ng.module(moduleId).factory(factoryId, [
        factory
    ])

    function factory() {

        return {
            getThing: getThing
        }

        function getThing(routeParams) {
            if (routeParams.username) {
                return {
                    name: routeParams.username,
                    type: ThingTypes.account
                };
            } else if (routeParams.subreddit) {
                return {
                    name: routeParams.subreddit,
                    type: ThingTypes.subreddit
                };
            } else {
                return {
                    name: 'all',
                    type: ThingTypes.subreddit
                }
            }
        }

    }

})('app', 'utilityService', angular);
