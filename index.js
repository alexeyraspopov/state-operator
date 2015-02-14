var newsletter = require('newsletter'),
	assign = require('object-assign');

function Operator(inputs, declaration){
	var signal = newsletter(), state;

	// TODO: describe prototype with default methods implementation (initialState, etc)
	return {
		subscribe: function(callback){
			if(typeof state === 'undefined'){
				// state transition
				state = declaration.initialState();

				inputs.forEach(function(tuple){
					var key = tuple[0],
						action = tuple[1];

					action.subscribe(function(data){
						// TODO: check operator result (maybe it's monad)
						// state transition
						assign(state, declaration[key](state, data));
						signal.publish(state);
					});
				});
			}

			signal.subscribe(callback);
		}
	};
}

module.exports = Transition;