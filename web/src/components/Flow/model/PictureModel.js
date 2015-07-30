/**
 * Created by Nick on 2/2/2015.
 */
define(function (require){
   var Backbone = require("backbone");

   var PictureModel = Backbone.Model.extend({
           defaults: {src: ""}
       });
    return PictureModel;
});
