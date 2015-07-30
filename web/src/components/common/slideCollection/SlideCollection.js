define(function(require){

	var $ = require('jquery'),
		Backbone = require('backbone'),
		_ = require('underscore'),
		slideCollectionTemplate = require('text!./template/slideCollectionTemplate.htm'),
		slideTemplate = require('text!./template/slideTemplate.htm');

	var SlideCollection = Backbone.View.extend({
		
		el: slideCollectionTemplate,

		initialize: function(options){
			this.collection = new Backbone.Collection(options.collection);
			this.parentElement = options.parentElement ?  $(options.parentElement) : $('body');
		},

		buildSlides: function(){
			var self = this;

			this.collection.forEach(function(model){
				var slide = $(slideTemplate);

				_.each(model.get("attrs"), function(value, attr){
					slide.attr(attr, value);
				});

				slide.append(model.get("content"));

				self.$el.append(slide);
			});
		},

		render: function(){
			this.buildSlides();
			this.parentElement.append(this.$el);
		}
	});

	return SlideCollection;

});