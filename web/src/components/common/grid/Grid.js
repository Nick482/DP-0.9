define(function(require){

    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        gridTemplate = require("text!./template/gridTemplate.htm"),
        ItemCollection = require("../itemCollection/ItemCollection");



    var Grid = Backbone.View.extend({
        el: gridTemplate,

        constructor: function(options){
            this.options = options;

            this.width = options.width;
            this.height = options.height;
            this.cellCollection = new ItemCollection({
                additionalCssClass: options.gridAdditionCssClass || "",
                itemAdditionalCssClass: options.cellAdditionCssClass || "",
                itemTemplate: options.cellTemplate,
                model: options.model,
                items: options.data || []
            });

            this.cellAdditionCssClass = "." + this.options.cellAdditionCssClass.split(" ").join(".");

            this.confirmButton = $('<button type="button" class="btn-success gridConfirm">Confirm</button>');
            this.resetButton = $('<button type="button" class="btn-danger gridReset">Reset</button>');

            Backbone.View.apply(this, arguments);
        },

        initialize: function() {
            this.initEvents();
        },

        initEvents: function() {
            this.listenTo(this.cellCollection, "item:selected", this.onCellClick);
        },

        onCellClick:function(cellView, model) {
            this.trigger("cell:selected", cellView, model);
        },

        renderData: function(data) {
            var self = this;
            _.each(this.cellCollection.models, function(model){
                var item = self.cellCollection.addItem(model);
                self.cellCollection.renderItem(item);
            });
        },

        enable: function(){
            this.$el.find(this.cellAdditionCssClass).removeClass("disabled");
            this.confirmButton.removeAttr('disabled');
            this.resetButton.removeAttr('disabled');
        },

        disable: function(){
            this.$el.find(this.cellAdditionCssClass).addClass("disabled");
            this.confirmButton.attr('disabled', 'disabled');
            this.resetButton.attr('disabled', 'disabled');
        },

        render: function(){
            this.$el.append(this.cellCollection.render().$el);
            this.$el.append(this.confirmButton);
            this.$el.append(this.resetButton);
            return this;
        }

    });


    return Grid;

});
