(function (moduleId, controllerId, ng) {
    'use strict';

    ng.module(moduleId).controller(controllerId, [
        '$location',
        '$routeParams',
        'utilityService',
        'dataService',
        'eventService',
        controller
    ])

    function controller($location, $routeParams, utilityService, dataService, eventService) {
        var vm = this;

        eventService.register('sidebarLoaded', function (evt, data) {
            vm.about = data;
        });

        eventService.loading();

        vm.isMobile = ((window.innerWidth > 0) ? window.innerWidth : screen.width) < 768;
        vm.count = $location.search().count;
        vm.count = parseInt(vm.count ? vm.count : 0);
        vm.thing = utilityService.getThing($routeParams);

        var query = new QueryBuilder('posts', {
            thing: vm.thing,
            sort: $routeParams.sort,
            sortType: $location.search().t,
            params: [
                ['before', $location.search().before],
                ['after', $location.search().after],
                ['count', $location.search().count]
            ]
        }).build();

        dataService.getPosts(query).then(success, failed).finally(always);

        function success(result) {
            vm.posts = result.data.children;
            vm.before = result.data.before;
            vm.after = result.data.after;
        }

        function failed(error){
            console.log(error);
        }

        function always() {
            eventService.loaded($routeParams);
        }



        vm.prev = function() {
            vm.count += vm.count % 25 == 0 ? 1 : -25;
            vm.after = undefined;
            navigate();
        }

        vm.next = function() {
            vm.count += vm.count % 25 == 1 ? -1 : 25;
            vm.before = undefined;
            navigate();
        }

        function fluidNext() {
            vm.count += vm.count % 25 == 1 ? -1 : 25;
            var params = [['after', vm.after], ['count', vm.count]];

            var query = new QueryBuilder('posts', {
                thing: vm.thing,
                sort: $routeParams.sort,
                sortType: $location.search().t,
                params: params
            }).build();

            dataService.getPosts(query).then(success, failed);

            function success(result) {
                Array.prototype.push.apply(vm.posts, result.data.children);
                vm.before = result.data.before;
                vm.after = result.data.after;
            }

            function failed(error){
                console.log(error);
            }
        }

        function navigate() {
            var location = $location.path();
            var params = [
                ['before', vm.before],
                ['after', vm.after],
                ['count', vm.count],
                ['t', $location.search().t]
            ];
            var isFirst = true;

            for (var i = 0; i < params.length; i++) {
                if (params[i][1] != undefined) {
                    if (isFirst) {
                        isFirst = false;
                        location += '?' + params[i][0] + '=' + params[i][1];
                    } else {
                        location += '&' + params[i][0] + '=' + params[i][1];
                    }
                }
            }

            window.location.hash = location;
        }

        $(window).scroll(function() {
            if (Math.abs($(window).scrollTop() - ($(document).height() - $(window).height())) < 5 && vm.isMobile) {
                fluidNext();
            }
        });

    }

})('app', 'frontpage', angular);


function toggleVote(obj, vote) {
    if (vote == 1) {
        obj.classList.toggle('up');
        $(obj.parentNode).children('.down').removeClass('down');
    } else {
        obj.classList.toggle('down');
        $(obj.parentNode).children('.up').removeClass('up');
    }
}
