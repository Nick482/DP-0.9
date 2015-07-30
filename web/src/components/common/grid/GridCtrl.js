/**
 * Created by Nick on 4/7/2015.
 */
define(function(require) {
    var $ = require('jquery'),
    impress = require('impress');

    function GridCtrl (options) {
        var picSequence = "",
            grid = options.grid,
            verify = options.verify,
            url = options.url,
            userModel = options.userModel;

        grid.$el.find(".item.col-xs-4.thumb").on("click", function(){
            var $el = $(this),
                symbol = $el.attr("item-id").slice(1);

            if(!$el.hasClass("disabled")){
                picSequence = picSequence + symbol;
                $el.find("img").addClass("picked");
            }
            
        });

        grid.$el.find("button.btn-success").on("click", function() {
            $.post(url,
                {
                    picSequence: picSequence,
                    id: userModel.get("id")
                }).statusCode({
                    261: function () {
                        impress().next();
                        verify.enable();
                        picSequence = "";
                    },
                    262: function(data){
                        alert("Picture sequence incorrect")
                        }})
        });

        grid.$el.find("button.btn-danger").on("click", function(){
            picSequence = "";
            grid.$el.find("img").removeClass("picked");
        });
}
    return GridCtrl;
});