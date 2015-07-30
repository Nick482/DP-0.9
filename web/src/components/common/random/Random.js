/**
 * Created by Nick on 3/13/2015.
 */
define(function(require){
    var Backbone = require('backbone'),
        $ = require('jquery'),
        sendTemplate = require('text!./template/randomTemplate.htm'),
        _ = require('underscore');

    var Random = Backbone.View.extend({
        el: sendTemplate,

        events: {
            "click" : "verify"
        },

        constructor: function(options){
            if(!options){
                throw 'itemTemplate option is required';
            }

            this.sendTemplate = options.sendTemplate;

            this.initialize();
        },

        initialize: function(){
            this.setElement(this.el);
        },

        disable: function(){
            this.$el.find("button").addClass("disabled");
        },

        enable: function(){
            this.$el.find("button").removeClass("disabled");
        },

        render: function(){
            return this;
        },

        verify: function(event){
            this.trigger("verify", this, event);
        }

    });
    return Random
});