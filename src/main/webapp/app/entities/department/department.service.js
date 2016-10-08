(function() {
    'use strict';
    angular
        .module('jdlDemoApp')
        .factory('Department', Department);

    Department.$inject = ['$resource'];

    function Department ($resource) {
        var resourceUrl =  'api/departments/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
