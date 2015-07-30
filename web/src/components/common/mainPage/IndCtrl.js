/**
 * Created by Nick on 4/16/2015.
 */
define(function(require){

    var $ = require('jquery');

function IndCtrl(){
    $(document).ready(
    $("#signUp").click(function () {
        window.location.href = "/sign_up"
    }),
    $("#signIn").click(function () {
        window.location.href = "/sign_in"
    })
    )}
    return IndCtrl()
    });