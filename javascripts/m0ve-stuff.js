window.onload = function() {
    var byeContainer = $("#bye-container");
    var cursor = $("#cursor");
    var blinkSpeed = 500;
    var showCursor = false;
    setInterval(function() {
        if (showCursor) {
            cursor.css("color", "#A4C639");
            showCursor = false;
        } else {
            cursor.css("color", "black");
            showCursor = true;
        }
    }, blinkSpeed);
    TweenLite.to(byeContainer, 1.5, {
        ease: Bounce.easeOut,
        y: "300%"
    });
};
