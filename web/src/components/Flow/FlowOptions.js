/**
 * Created by Nick on 4/24/2015.
 */
define(function(require){
    var signInDialogTemplate = require('text!components/Flow/template/signInDialogTemplate.htm'),
        signUpDialogTemplate = require('text!components/Flow/template/signUpDialogTemplate.htm');

   function FlowOptions(type) {
       if (type == "Up") {
           this.SlideOptions = {collection: [
               {
                   attrs: {
                       'id': "signUpDialogSlide",
                       'class': "step slide",
                       'data-x': "-1000",
                       'data-y': "10000"
                   }

               },
               {
                   attrs: {
                       'id': "pictureGridDialog",
                       'class': "step slide",
                       'data-x': "0",
                       'data-y': "10000"
                   }

               },
               {
                   attrs: {
                       'id': "randomSlide",
                       'class': "step slide",
                       'data-x': "1000",
                       'data-y': "10000"
                   }

               }
           ]};
           this.GridCtrlOptions = {
               url: "users/pics"
           };
           this.RandOptions = {
               url: "users/generateUp"
           };
           this.valOptions = {
               attributes: ["login", "password", "email"]
           };
           this.DialogOptions = {
               url: "http://localhost:3000/users/new"
           };
           this.dialogTemplate = signUpDialogTemplate;
       }
       if (type == "In") {
           this.SlideOptions = {collection: [
               {
                   attrs: {
                       'id': "signInDialogSlide",
                       'class': "step slide",
                       'data-x': "-1000",
                       'data-y': "10000"
                   }

               },
               {
                   attrs: {
                       'id': "pictureGridDialog",
                       'class': "step slide",
                       'data-x': "0",
                       'data-y': "10000"
                   }

               },
               {
                   attrs: {
                       'id': "randomSlide",
                       'class': "step slide",
                       'data-x': "1000",
                       'data-y': "10000"
                   }

               }
           ]};
           this.GridCtrlOptions = {
               url: "users/picCheck"
           };
           this.RandOptions = {
               url: "users/generateIn"
           };
           this.valOptions = {
               attributes: ["login", "password"]
           };
           this.DialogOptions = {
               url: "http://localhost:3000/users/check"
           };
           this.dialogTemplate = signInDialogTemplate;
       }
}
    return FlowOptions;
});