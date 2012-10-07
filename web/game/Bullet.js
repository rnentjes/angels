Angels.Bullet = function() {
    return {
        draw: function(x, y) {
            var context = Angels.Game.getContext();

            context.translate(x, y);
            Angels.Images.draw(context, "bullet", 0.2);
            context.translate(-x, -y);
        }
    }
}();
