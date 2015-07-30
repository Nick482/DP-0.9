define(function(require){
    var Backbone = require('backbone'),
        flowTemplate = require('text!components/Flow/template/flowTemplate.htm'),
        $ = require('jquery'),
        SignDialog = require('components/Flow/SignDialog'),
        UserModel = require('components/Flow/model/UserModel'),
        Grid = require("components/common/grid/Grid"),
        PictureModel = require("components/Flow/model/PictureModel"),
        pictureTemplate = require("text!components/Flow/template/pictureTemplate.htm"),
        pathfinder = require("components/common/pathFinder/pathfinder"),
        Random = require("components/common/random/Random"),
        GridCtrl = require("components/common/grid/GridCtrl"),
        SlideCollection = require("components/common/slideCollection/SlideCollection"),
        FlowOptions = require('components/Flow/FlowOptions'),
        Validation = require('validation');

    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });

    require("css!components/Flow/css/Flow.css");
    var impress = require("impress");

    var Flow = Backbone.View.extend({

        el: flowTemplate,

        initialize: function() {
            this.flowOptions = {};
            switch (Flow.arguments[0]) {
                case "Up":
                    this.flowOptions = new FlowOptions("Up");
                    break;
                case "In":
                    this.flowOptions = new FlowOptions("In");
                    break;
                return this.flowOptions
            }
            this.userModel = new UserModel();

            this.signDialog = new SignDialog({
                dialogTemplate: this.flowOptions.dialogTemplate,
                model: this.userModel
            });

            this.pictureGrid = new Grid({
                cellTemplate: pictureTemplate,
                model: PictureModel,
                data: pathfinder(3, 3),
                cellAdditionCssClass: "col-xs-4 thumb",
                gridAdditionCssClass: "row"
            });

            this.rand = new Random({});

            this.slideCollection = new SlideCollection(this.flowOptions.SlideOptions,
                this.flowOptions.SlideOptions.collection[0].content = this.signDialog.render(),
                this.flowOptions.SlideOptions.collection[1].content = this.pictureGrid.render().$el,
                this.flowOptions.SlideOptions.collection[2].content = this.rand.render().$el
            );

            this.render();

            this.initEvents();


            Backbone.Validation.bind(this.signDialog, this.flowOptions.valOptions);
        },

        initEvents: function(){
            var self = this;

            this.listenTo(this.pictureGrid, "cell:selected",
                GridCtrl({
                    grid: this.pictureGrid,
                    userModel: this.userModel,
                    verify: this.rand,
                    url: this.flowOptions.GridCtrlOptions.url
                })
            );
            this.listenTo(this.rand, "verify",
                function(){
                    $.post(this.flowOptions.RandOptions.url,
                        {
                            id: this.userModel.get("id")
                        },
                        function (data) {
                            var mL = "http://" + data.slice((data.indexOf("@")+1));
                            window.location.href = mL
                        }
                    )
                }
            );

            this.listenTo(this.signDialog, "button:click", function(dialog){
                var userObj = dialog.model.toJSON();
                dialog.model.set(userObj);
                if(dialog.model.isValid(true)) {
                        var url = this.flowOptions.DialogOptions.url;
                    $.post(url, userObj).statusCode({
                        255: function (data) {
                            dialog.model.set(data);
                            impress().next();
                            self.pictureGrid.enable();
                        },
                        256: function(data){
                            console.log(data);
                            $("#login.help-block").append(data).addClass('has-error').removeClass("hidden")
                        },
                        257: function(data){
                            console.log(data);
                            $("#email.help-block").append(data).removeClass("hidden")
                        },
                        258: function(data){
                            console.log(data);
                            $("#login.help-block").append("Specified username is taken").removeClass("hidden");
                            $("#email.help-block").append("E-mail " + data + " has already been registered").removeClass("hidden");
                        },
                        259: function(data){
                            console.log(data);
                            $("#password.help-block").append("Password incorrect").removeClass("hidden");
                        },
                        260: function(data){
                            console.log(data);
                            $("#login.help-block").append("User + " + data + " not found").addClass('has-error').removeClass("hidden")
                        }
                        });
                }
                });
        },

        render: function() {
            this.slideCollection.render();
            this.pictureGrid.disable();
            this.rand.disable();
            impress().init();
        }
    });


    return Flow;

});