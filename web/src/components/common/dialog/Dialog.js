define(function(require){

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery');



	var Dialog = Backbone.View.extend({
        events: {
            "keyup input": "onKeyUp",
            "change input[type='text'], input[type='checkbox'], input[type='radio']": "onKeyUp"
        },
        el: function(template){
            return "<div id='form'>"+ template + "</div>";
        },

		constructor: function(options) {
            this.model = options.model;
            this.dialogTemplate = options.dialogTemplate;
            this.initialize();
        },

		initialize: function(){
            this.setElement(this.el(this.dialogTemplate));
		},

        onKeyUp: function(event){
            var target = $(event.target);
            var attribute = target.attr("name");
            this.model.set(attribute, target.val())
        },

		render: function(){
            return this.$el;
		}

	});


	return Dialog;

});