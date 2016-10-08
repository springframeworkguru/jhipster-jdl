'use strict';

describe('Controller Tests', function() {

    describe('JobHistory Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockJobHistory, MockDepartment, MockJob, MockEmployee;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockJobHistory = jasmine.createSpy('MockJobHistory');
            MockDepartment = jasmine.createSpy('MockDepartment');
            MockJob = jasmine.createSpy('MockJob');
            MockEmployee = jasmine.createSpy('MockEmployee');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'JobHistory': MockJobHistory,
                'Department': MockDepartment,
                'Job': MockJob,
                'Employee': MockEmployee
            };
            createController = function() {
                $injector.get('$controller')("JobHistoryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'jdlDemoApp:jobHistoryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
