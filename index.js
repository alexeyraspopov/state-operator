var newsletter = require('newsletter'),
	assign = require('object-assign');

function Transition(inputs, declaration){
	var signal = newsletter(), state;

	// TODO: move this part somewhere. it shouldn't work until someone will subscribe changes
	inputs.forEach(function(tuple){
		var key = tuple[0],
			action = tuple[1],
			operator = declaration[key];

		action.subscribe(function(data){
			// state transition
			// TODO: check operator result (maybe it's monad)
			assign(state, operator(state, data));
			signal.publish(state);
		});
	});

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