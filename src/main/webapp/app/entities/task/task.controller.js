(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', '$state', 'Task'];

    function TaskController ($scope, $state, Task) {
        var vm = this;
        
        vm.tasks = [];

        loadAll();

        function loadAll() {
            Task.query(function(result) {
                vm.tasks = result;
            });
        }
    }
})();
