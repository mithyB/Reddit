(function (moduleId, factoryId, ng) {
    'use strict';

    ng.module(moduleId).factory(factoryId, [
        '$q',
        factory
    ]);

    function factory($q) {

        return {
            getSidebar: getSidebar,
            getPosts: getPosts,
            getPost: getPost,
            getMoreComments: getMoreComments
        };

        function getSidebar(query) {
            var deferred = $q.defer();

            $.getJSON(query).then(success, failed);

            function success(result) {
                deferred.resolve(result);
            }

            function failed(result) {
                deferred.reject(result);
            }

            return deferred.promise;
        }

        function getPosts(query) {
            var deferred = $q.defer();

            $.getJSON(query).then(success, failed);

            function success(result) {
                deferred.resolve(result);
            }

            function failed(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }

        function getPost(query) {
            var deferred = $q.defer();

            $.getJSON(query).then(success, failed);

            function success(result) {
                deferred.resolve(result);
            }

            function failed(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }

        function getMoreComments(query) {
            var deferred = $q.defer();

            $.getJSON(query).then(success, failed);

            function success(result) {
                deferred.resolve(result);
            }

            function failed(error) {
                deferred.reject(error);
            }

            return deferred.promise;
        }
    }

})('app', 'dataService', angular);
