(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('DepartmentDeleteController',DepartmentDeleteController);

    DepartmentDeleteController.$inject = ['$uibModalInstance', 'entity', 'Department'];

    function DepartmentDeleteController($uibModalInstance, entity, Department) {
        var vm = this;

        vm.department = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Department.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
