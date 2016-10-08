(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('TaskDeleteController',TaskDeleteController);

    TaskDeleteController.$inject = ['$uibModalInstance', 'entity', 'Task'];

    function TaskDeleteController($uibModalInstance, entity, Task) {
        var vm = this;

        vm.task = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Task.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
