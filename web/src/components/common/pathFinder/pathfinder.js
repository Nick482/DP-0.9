/**
 * Created by Nick on 2/28/2015.
 */
define(function(require){
    function pathfinder(height, width) {
        source = [];
        for (i = 1; i <= (height * width); i++) {
            source[i-1] = {src: "images/" + i + ".jpg"};
            }
        return source;
    }
return pathfinder;
});
