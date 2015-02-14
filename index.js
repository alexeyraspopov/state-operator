var newsletter = require('newsletter'),
	assign = require('object-assign');

function Transition(inputs, declaration){
	var signal = newsletter(), state;

	Object.keys(inputs).forEach(function(key){
		inputs[key].subscribe(function(data){
			// state transition
			assign(state, declaration[key](state, data));
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