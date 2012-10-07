Angels.Images = function() {
    var sources = {
        body:       "images/body.png",
        turret:     "images/turret.png",
        radar:      "images/radar.png",
        bullet:     "images/explosion/explosion1-1.png"
    };

    var images = {};

    return {
        init: function(callback) {
            var loadedImages = 0;
            var numImages = 0;

            // get num of sources
            for(var cnt in sources) {
                numImages++;
            }

            for(var src in sources) {
                images[src] = new Image();
                images[src].onload = function() {
                    if(++loadedImages >= numImages) {
                        callback(images);
                    }
                };

                images[src].src = sources[src];
            }

        },

        get: function(name) {
            return images[name];
        },

        draw: function(context, name, s) {
            var image = images[name];
            var width = image.width;
            var height = image.height;
            var size = s;

            if (size == undefined) {
                size = 1.0;
            }

            width = width * size;
            height = height * size;

            context.drawImage(image, -width / 2, -height / 2, width, height);
        }
    };
}();
