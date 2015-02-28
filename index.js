// TODO: reduce closures
// TODO: reduce push points
// TODO: reduce state changes (inital state and state assign)
// TODO: move to hot observable (?)
var newsletter = require('newsletter'),
	assign = require('object-assign'),
	onetime = require('onetime');

var prototype = {
	initialState: function(){
		return Object.create(null);
	},
	emit: function(state){
		return state;
	}
};

function Operator(inputs, declaration){
	var signal = newsletter(),
		methods = assign(Object.create(prototype), declaration),
		// FIXME: hot observable!
		state = methods.initialState();

	var initialSubscribe = onetime(function(){
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
	});

	function publish(callback){
		callback(methods.emit(state));
	}

	function initialPublish(callback){
		return Object.keys(state).length && publish(callback);
	}

	return {
		subscribe: function(callback){
			initialSubscribe();
			initialPublish(callback);

			return signal.subscribe(callback);
		}
	};
}

module.exports = Operator;