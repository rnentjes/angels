Angels.Game = function() {
    var screenWidth;
    var screenHeight;
    var context;
    var keyboard;
    var score = 0;

    var images;

    var tanksRenderTime = 0;
    var tanks_fpsCount = 0;
    var tanks_lastFps = new Date().getTime();
    var tanksAvgRenderTime = 0;

    var angels = new Array();

    return {
        init: function(ims) {
            images = ims;

            var canvas = document.getElementById('world');
            context = canvas.getContext('2d');

            screenWidth = canvas.width;
            screenHeight = canvas.height;

            keyboard = new Keyboard();

            console.log(context, screenWidth, screenHeight);

            Angels.Game.render();
        },

        drawRectangle: function(color, x, y, width, height) {
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        },

        clearAll: function() {
            context.fillStyle = "#000";
            context.fillRect(0, 0, screenWidth, screenHeight);
        },

        drawCircle: function(color, x, y, radius) {
            context.strokeStyle = color;
            context.fillStyle = color;

            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI*2, true);
            context.closePath();
            context.fill();
        },

        getContext: function() {
            return context;
        },

        render: function() {
            var renderStart = new Date().getTime();

            // physics
            var length;
            var maxColor = 0;
            var minColor = 1000000000000;

            for (var i=0; i<angels.length;i++) {
                var angel = angels[i];

                angel.dx = 0;
                angel.dy = 0;
                angel.color = 0;

                for (var j=0; j<angels.length;j++) {
                    var other = angels[j];

                    if (i != j) {
                        dx = angel.x-other.x;
                        dy = angel.y-other.y;

                        length = Math.sqrt(dx*dx + dy*dy);
                        //angel.color += length;

                        var angle = Math.atan((angel.x - other.x) / (other.y - angel.y));
                        if (angel.y > other.y) {
                            angle += Math.PI;
                        }

                        if (length > 0) {
                            if (length < 150) {
                                angel.dx += Math.sin(angle) / (Math.sqrt(length) * 1);
                                angel.dy -= Math.cos(angle) / (Math.sqrt(length) * 1);
                            } else /* if (length < 90000)*/ {
                                angel.dx -= Math.sin(angle) / (Math.sqrt(length) * 1);
                                angel.dy += Math.cos(angle) / (Math.sqrt(length) * 1);
                            }
                        }
                    }
                }
            }

            // apply calculations
            for (i=0; i<angels.length;i++) {
                angel = angels[i];

                //angel.color = Math.sqrt(angel.dx * angel.dx + angel.dy * angel.dy);

                angel.x += angel.dx;
                angel.y += angel.dy;

                if (angel.x < 50) {
                    angel.x = 50;
                }

                if (angel.y < 50) {
                    angel.y = 50;
                }

                if (angel.x > (screenWidth - 50)) {
                    angel.x = screenWidth - 50;
                }

                if (angel.y > (screenHeight - 50)) {
                    angel.y = screenHeight - 50;
                }

            }

            Angels.Game.clearAll();

            context.globalCompositeOperation = "none";

            for (i=0; i<angels.length;i++) {
                Angels.Game.drawCircle("#ff0", angels[i].x, angels[i].y, 3);
            }


            if (keyboard.keys[32] || mousedown) {
                console.log("More angels! -> "+angels.length, maxColor);

                angels.push(new Angels.Angel(Math.random() *screenWidth, Math.random() * screenHeight));
            }

            //Angels.Bullet.draw(mousex, mousey);

            //context.globalCompositeOperation = "none";

            //Tanks.Game.requestAnimFrame(Tanks.Game.render);
            setTimeout(Angels.Game.render, 1);
        },

        requestAnimFrame: function() {
            return (
                    window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.oRequestAnimationFrame      ||
                    window.msRequestAnimationFrame     ||
                    function(/* function */ callback) {
                        window.setTimeout(callback, 1);
                    }
                );
        }
    };
}();
