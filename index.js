var newsletter = require('newsletter'),
	assign = require('object-assign');

function Operator(inputs, declaration){
	var signal = newsletter(), state;

	// TODO: move this part somewhere. it shouldn't work until someone will subscribe changes
	inputs.forEach(function(tuple){
		var key = tuple[0],
			action = tuple[1],
			operator = declaration[key];

		action.subscribe(function(data){
			// TODO: check operator result (maybe it's monad)
			// state transition
			assign(state, operator(state, data));
			signal.publish(state);
		});
	});

	// TODO: describe prototype with default methods implementation (initialState, etc)
	return {
		subscribe: function(callback){
			if(typeof state === 'undefined'){
				// state transition
				state = declaration.initialState();
			}

			signal.subscribe(callback);
		}
	};
}

module.exports = Transition;