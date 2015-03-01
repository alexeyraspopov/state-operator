// TODO: reduce closures
// TODO: reduce push points
// TODO: reduce state changes (inital state and state assign)
var newsletter = require('newsletter'),
	assign = require('object-assign');

var prototype = {
	initialState: function(){
		// should we identify initial state?
		return Object.create(null);
	},
	emit: function(state){
		return state;
	}
};

function Operator(inputs, declaration){
	var signal = newsletter(),
		methods = assign(Object.create(prototype), declaration),
		state = methods.initialState();

	inputs.forEach(function(tuple){
		var key = tuple[0],
			action = tuple[1];

		action.subscribe(function(data){
			var newState = methods[key](state, data);

			// TODO: check newState type (maybe it's monad)
			assign(state, newState);
			publish(signal.publish);
		});
	});

	function publish(callback){
		callback(methods.emit(state));
	}

	function initialPublish(callback){
		return Object.keys(state).length && publish(callback);
	}

	return {
		subscribe: function(callback){
			initialPublish(callback);

			return signal.subscribe(callback);
		}
	};
}

module.exports = Operator;