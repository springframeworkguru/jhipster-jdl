(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('JobHistoryDialogController', JobHistoryDialogController);

    JobHistoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'JobHistory', 'Job', 'Department', 'Employee'];

    function JobHistoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, JobHistory, Job, Department, Employee) {
        var vm = this;

        vm.jobHistory = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.jobs = Job.query({filter: 'jobhistory-is-null'});
        $q.all([vm.jobHistory.$promise, vm.jobs.$promise]).then(function() {
            if (!vm.jobHistory.jobId) {
                return $q.reject();
            }
            return Job.get({id : vm.jobHistory.jobId}).$promise;
        }).then(function(job) {
            vm.jobs.push(job);
        });
        vm.departments = Department.query({filter: 'jobhistory-is-null'});
        $q.all([vm.jobHistory.$promise, vm.departments.$promise]).then(function() {
            if (!vm.jobHistory.departmentId) {
                return $q.reject();
            }
            return Department.get({id : vm.jobHistory.departmentId}).$promise;
        }).then(function(department) {
            vm.departments.push(department);
        });
        vm.employees = Employee.query({filter: 'jobhistory-is-null'});
        $q.all([vm.jobHistory.$promise, vm.employees.$promise]).then(function() {
            if (!vm.jobHistory.employeeId) {
                return $q.reject();
            }
            return Employee.get({id : vm.jobHistory.employeeId}).$promise;
        }).then(function(employee) {
            vm.employees.push(employee);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.jobHistory.id !== null) {
                JobHistory.update(vm.jobHistory, onSaveSuccess, onSaveError);
            } else {
                JobHistory.save(vm.jobHistory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jdlDemoApp:jobHistoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.startDate = false;
        vm.datePickerOpenStatus.endDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
