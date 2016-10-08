(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('LocationDialogController', LocationDialogController);

    LocationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Location', 'Country'];

    function LocationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Location, Country) {
        var vm = this;

        vm.location = entity;
        vm.clear = clear;
        vm.save = save;
        vm.countries = Country.query({filter: 'location-is-null'});
        $q.all([vm.location.$promise, vm.countries.$promise]).then(function() {
            if (!vm.location.country || !vm.location.country.id) {
                return $q.reject();
            }
            return Country.get({id : vm.location.country.id}).$promise;
        }).then(function(country) {
            vm.countries.push(country);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.location.id !== null) {
                Location.update(vm.location, onSaveSuccess, onSaveError);
            } else {
                Location.save(vm.location, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jdlDemoApp:locationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
