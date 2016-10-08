(function() {
    'use strict';

    angular
        .module('jdlDemoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('job-history', {
            parent: 'entity',
            url: '/job-history',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'JobHistories'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-history/job-histories.html',
                    controller: 'JobHistoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('job-history-detail', {
            parent: 'entity',
            url: '/job-history/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'JobHistory'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-history/job-history-detail.html',
                    controller: 'JobHistoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'JobHistory', function($stateParams, JobHistory) {
                    return JobHistory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'job-history',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('job-history-detail.edit', {
            parent: 'job-history-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-dialog.html',
                    controller: 'JobHistoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-history.new', {
            parent: 'job-history',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-dialog.html',
                    controller: 'JobHistoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                startDate: null,
                                endDate: null,
                                language: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('job-history', null, { reload: 'job-history' });
                }, function() {
                    $state.go('job-history');
                });
            }]
        })
        .state('job-history.edit', {
            parent: 'job-history',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-dialog.html',
                    controller: 'JobHistoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-history', null, { reload: 'job-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-history.delete', {
            parent: 'job-history',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-delete-dialog.html',
                    controller: 'JobHistoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-history', null, { reload: 'job-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
