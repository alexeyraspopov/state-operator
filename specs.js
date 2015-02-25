var Operator = require('./index'),
	newsletter = require('newsletter');

describe('State Operator', function(){
	it('should update state on specific action', function(done){
		var action = newsletter(), states;

		states = Operator([
			['update', action]
		], {
			update: function(state, data){
				return { data: data };
			}
		});

		states.subscribe(function(state){
			expect(state.data).toBe(13);
			done();
		});

		action.publish(13);
	});

	it('should publish initial state when it\'s defined', function(done){
		var states = Operator([], {
			initialState: function(){
				return { data: 13 };
			}
		});

		states.subscribe(function(state){
			expect(state.data).toBe(13);
			done();
		});
	});

	it('should emit actual state for new subscribers', function(done){
		var action = newsletter(), states;

		states = Operator([
			['update', action]
		], {
			initialState: function(){
				return { data: 12 };
			},
			update: function(state, data){
				return { data: data };
			}
		});

		states.subscribe(function(){/* initialize */});

		action.publish(13);

		states.subscribe(function(state){
			expect(state.data).toBe(13);
			done();
		});
	})
});
