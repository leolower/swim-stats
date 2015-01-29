// Group by module
describe('swim-stats.module1', function() {

    // Initialise the module for each test
    beforeEach(module('swim-stats.module1'));

    ////////////////
    // CONTROLLER //
    ////////////////
    describe('StatAddController', function() {
        var ctrl, some_array, StatService;

        beforeEach(inject(function($controller, _StatService_) {
            some_array = ['some', 'some more'];
            StatService = _StatService_;
            ctrl = $controller('StatAddController', {
                "StatService": StatService,
                "some_array": some_array
            });
        }));

        it('should initialize the ctrl variables', function() {
            expect(ctrl.name).toBe('StatAddController');
            expect(typeof ctrl.items).toBe('object');
            expect(StatService).toBeDefined();
            expect(ctrl.items[0]).toBe(some_array[0]);
        });
    });

});
