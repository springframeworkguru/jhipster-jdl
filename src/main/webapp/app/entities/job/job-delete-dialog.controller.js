(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('JobDeleteController',JobDeleteController);

    JobDeleteController.$inject = ['$uibModalInstance', 'entity', 'Job'];

    function JobDeleteController($uibModalInstance, entity, Job) {
        var vm = this;

        vm.job = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Job.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
