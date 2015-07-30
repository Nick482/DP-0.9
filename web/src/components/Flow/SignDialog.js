/**
 * Created by Nick on 4/24/2015.
 */
define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        Dialog = require('components/common/dialog/Dialog'),
        _ = require('underscore');


    var SignDialog = Dialog.extend({
        events: _.extend({}, Dialog.prototype.events,{
            "click #confirm": "onClick"
        }),

        onClick: function() {
            this.trigger("button:click", this);
        }
    });
    return SignDialog;
});