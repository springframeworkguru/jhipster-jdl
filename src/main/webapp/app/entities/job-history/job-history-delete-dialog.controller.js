(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('JobHistoryDeleteController',JobHistoryDeleteController);

    JobHistoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'JobHistory'];

    function JobHistoryDeleteController($uibModalInstance, entity, JobHistory) {
        var vm = this;

        vm.jobHistory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            JobHistory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
