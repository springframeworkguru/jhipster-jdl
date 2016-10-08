(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('department', {
            parent: 'entity',
            url: '/department',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Departments'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departments.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('department-detail', {
            parent: 'entity',
            url: '/department/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Department'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/department-detail.html',
                    controller: 'DepartmentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Department', function($stateParams, Department) {
                    return Department.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'department',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('department-detail.edit', {
            parent: 'department-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department.new', {
            parent: 'department',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                departmentName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: 'department' });
                }, function() {
                    $state.go('department');
                });
            }]
        })
        .state('department.edit', {
            parent: 'department',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: 'department' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department.delete', {
            parent: 'department',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-delete-dialog.html',
                    controller: 'DepartmentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: 'department' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
