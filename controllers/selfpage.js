(function (moduleId, controllerId, ng) {
    'use strict';

    ng.module(moduleId).controller(controllerId, [
        '$routeParams',
        '$location',
        'utilityService',
        'dataService',
        'eventService',
        controller
    ])

    function controller($routeParams, $location, utilityService, dataService, eventService) {
        var vm = this;

        eventService.loading();

        vm.commentId = $location.search().comment;
        vm.thing = utilityService.getThing($routeParams);

        if ($routeParams.id.indexOf('t3_') == 0) {
            $routeParams.id = $routeParams.id.substring(3);
        }

        var query = new QueryBuilder('post', {
            thing: vm.thing,
            id: $routeParams.id
        }).build();

        dataService.getPost(query).then(success, failed).finally(always);

        function success(result) {
            vm.post = result[0].data.children[0];
            vm.comments = result[1].data.children;
        }

        function failed(error) {
            console.log(error);
        }

        function always(){
            eventService.loaded($routeParams);
        }


        vm.loadMoreComments = function(comment) {
            var commentIds = comment.data.children;
            var comments = [];
            var callbackCount = 0;

            comment.loading = true;

            for (var i = 0; i < commentIds.length; i++) {

                var query = new QueryBuilder('comment', {
                    permalink: vm.post.data.permalink,
                    commentId: commentIds[i]
                }).build();

                dataService.getMoreComments(query).then(success, error);
            }

            function success(result){
                comments.push(result[1].data.children[0]);

                if (++callbackCount == commentIds.length) {
                    vm.comments.updateMoreComments(comment.data.name, comments);
                }
            }
            function error(error) {
                console.log(error);
            }
        }


    }

})('app', 'selfpage', angular);