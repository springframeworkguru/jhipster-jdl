(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .controller('CountryDialogController', CountryDialogController);

    CountryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Country', 'Region'];

    function CountryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Country, Region) {
        var vm = this;

        vm.country = entity;
        vm.clear = clear;
        vm.save = save;
        vm.regions = Region.query({filter: 'country-is-null'});
        $q.all([vm.country.$promise, vm.regions.$promise]).then(function() {
            if (!vm.country.region || !vm.country.region.id) {
                return $q.reject();
            }
            return Region.get({id : vm.country.region.id}).$promise;
        }).then(function(region) {
            vm.regions.push(region);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.country.id !== null) {
                Country.update(vm.country, onSaveSuccess, onSaveError);
            } else {
                Country.save(vm.country, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jdlDemoApp:countryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
