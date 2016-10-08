(function() {
    'use strict';
    angular
        .module('jdlDemoApp')
        .factory('Employee', Employee);

    Employee.$inject = ['$resource', 'DateUtils'];

    function Employee ($resource, DateUtils) {
        var resourceUrl =  'api/employees/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.hireDate = DateUtils.convertDateTimeFromServer(data.hireDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
