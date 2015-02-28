var Operator = require('./index'),
	newsletter = require('newsletter');

describe('State Operator', function(){
	it('should update state on specific signal', function(done){
		var signal = newsletter(), states;

		states = Operator([
			['update', signal]
		], {
			update: function(state, data){
				return { data: data };
			}
		});

		states.subscribe(function(state){
			expect(state.data).toBe(13);
			done();
		});

		signal.publish(13);
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
		var signal = newsletter(), states;

		states = Operator([
			['update', signal]
		], {
			initialState: function(){
				return { data: 12 };
			},
			update: function(state, data){
				return { data: data };
			}
		});

		states.subscribe(function(){/* initialize */});

		signal.publish(13);

		states.subscribe(function(state){
			expect(state.data).toBe(13);
			done();
		});
	})
});
