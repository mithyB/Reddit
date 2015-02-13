(function(moduleId, factoryId, ng) {
    'use strict';

    ng.module(moduleId).factory(factoryId, [
        '$rootScope',
        factory
    ]);

    function factory($rootScope) {

        return {
            loading: loading,
            loaded: loaded,
            sidebarLoaded: sidebarLoaded,
            register: register
        }

        function loading() {
            $rootScope.$emit('loading');
        }

        function loaded(param) {
            $rootScope.$emit('loaded', param);
        }

        function sidebarLoaded(param) {
            $rootScope.$emit('sidebarLoaded', param);
        }

        function register(evtName, evtFunction) {
            $rootScope.$on(evtName, evtFunction);
        }

    }

})('app', 'eventService', angular)
