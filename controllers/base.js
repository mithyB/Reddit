(function (moduleId, controllerId, ng) {
    'use strict';

    ng.module(moduleId).controller(controllerId, [
        '$routeParams',
        '$location',
        'dataService',
        'utilityService',
        'eventService',
        controller
    ]);

    function controller($routeParams, $location, dataService, utilityService, eventService) {
        var vm = this;

        vm.ThingTypes = ThingTypes

        vm.thing = utilityService.getThing($routeParams);

        eventService.register('loading', function() {
            vm.isLoading = true;
        });
        eventService.register('loaded', function(evt, data) {
            vm.thing = utilityService.getThing(data);

            var query = new QueryBuilder('sidebar', {
                thing: vm.thing
            }).build();

            dataService.getSidebar(query).then(success, failed).finally(always);

            function success(result) {
                vm.thing.name = result.data.display_name;

                vm.about = result;
                eventService.sidebarLoaded(result);
            }

            function failed(error) {
                console.log(error);

                vm.about = undefined;
                eventService.sidebarLoaded();
            }

            function always() {
                vm.isLoading = false;

                if ($location.search().comment) {
                    $(document.body).animate({
                        'scrollTop':   $('#' + $location.search().comment).offset().top - 75
                    }, 700);
                }

                document.title = 'Reddit Rebuilt - /' + vm.thing.type.toKey() + '/' + vm.thing.name;
                setTimeout(replaceRedditLinks, 10);
            }
        });


        vm.search = { type: vm.thing.type };

        vm.search.changeType = function(type) {
            vm.search.type = type;
        }

        vm.isActive = function(route) {
            return $routeParams.sort == route;
        }
    }

})('app', 'base', angular);