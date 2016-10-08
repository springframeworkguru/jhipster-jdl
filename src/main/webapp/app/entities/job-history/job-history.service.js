(function() {
    'use strict';
    angular
        .module('jdlDemoApp')
        .factory('JobHistory', JobHistory);

    JobHistory.$inject = ['$resource', 'DateUtils'];

    function JobHistory ($resource, DateUtils) {
        var resourceUrl =  'api/job-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.startDate = DateUtils.convertDateTimeFromServer(data.startDate);
                        data.endDate = DateUtils.convertDateTimeFromServer(data.endDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
