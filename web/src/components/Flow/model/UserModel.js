/**
 * Created by Nick on 1/15/2015.
 */
define(function(require) {
    var Backbone = require('backbone');

    var UserModel = Backbone.Model.extend({
        defaults: {
            login: "",
            password: "",
            email: "",
            picSequence: "",
            randLink: "",
            verified: false
        },
        validation: {
            login:{
                required: true,
                msg: "Please enter a login"
            },
            password:{
                minLength: 8,
                msg: "Minimum password length is 8 characters"
            },
            email:{
                pattern: 'email',
                msg: "Please enter a valid E-mail"
           }
        }
    });
    return UserModel;
});