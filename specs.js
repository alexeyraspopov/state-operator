var Transition = require('./index'),
	newsletter = require('newsletter');

describe('State Transition', function(){
	it('should update state on specific action', function(done){
		var action = newsletter(), states;

		states = Transition([
			['increment', action]
		], {
			initialState: function(){
				return { counter: 0 };
			},
			increment: function(state, data){
				return { counter: state.counter + data };
			}
		});

		states.subscribe(function(state){
			expect(state.counter).toBe(13);
			done();
		});

		action.publish(13);
	});
});