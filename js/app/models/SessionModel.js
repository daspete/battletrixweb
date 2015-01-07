define([
	'backbone'
], function(
	Backbone
){
	var SessionModel=Backbone.Model.extend({

		urlRoot: '/api/sessions',

		defaults: {
			sessionID: '000111000',
			muted: false
		}

	});

	return SessionModel;
});