var newsletter = require('newsletter'),
	assign = require('object-assign'),
	onetime = require('onetime');

var prototype = {
	emit: function(state){
		return state;
	}
};

function Operator(inputs, declaration){
	var signal = newsletter(),
		state = Object.create(null),
		methods = assign(Object.create(prototype), declaration);

	var initialSubscribe = onetime(function(){
		inputs.forEach(function(tuple){
			var key = tuple[0],
				action = tuple[1];

			action.subscribe(function(data){
				// TODO: check operator result (maybe it's monad)
				// state transition
				assign(state, methods[key](state, data));
				signal.publish(methods.emit(state));
			});
		});
	});

	function pushInitialState(callback){
		if(typeof methods.initialState === 'function'){
			// state transition
			assign(state, methods.initialState());
			callback(methods.emit(state));
		}
	}

	return {
		subscribe: function(callback){
			initialSubscribe();
			pushInitialState(callback);

			return signal.subscribe(callback);
		}
	};
}

module.exports = Operator;