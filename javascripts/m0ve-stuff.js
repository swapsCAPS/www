window.onload = function() {
    var htmlText = "";
    htmlText += "<p id=\"greeting\" class=\"greeting\">Hi there!</p>";
    htmlText += "<p id=\"name\">My name is Daniel.</p>";
    htmlText += "<p id=\"message\">I like to make and break stuff using Android, Java, Node, Javascript, Python, Raspberry Pis, Blender, LEGO Technics and more.</p>";
    htmlText += "<p id=\"closer\">Thanks for visiting! : )</p>";
    htmlText += "<p id=\"bye-container\" class=\"bye-container\">";
    htmlText += "<span id=\"bye\" class=\"bye\">Bye!</span>";
    htmlText += "<span id=\"cursor\" class=\"cursor\">_</span>";
    htmlText += "</p>";

    var mainContainer = $("#container");
    typeHTML(mainContainer, htmlText);
    // typeElement(mainContainer);

    function finish() {
        blinkCursor();
        dropBye();
    }

    function blinkCursor() {
        var cursor = $("#cursor");
        var blinkSpeed = 550;
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
    }

    function dropBye() {
        setTimeout(function() {
            var byeContainer = $("#bye-container");
            TweenLite.to(byeContainer, 1.5, {
                ease: Bounce.easeOut,
                y: "250%"
            });
        }, 1989);
    }

    function typeHTML(element, html) {
        var length = html.length;
        var typingSpeed = 50;
        element.html("");
        incrementText();
        var index = 0;
        function incrementText() {
            setTimeout(function() {
                var typed = html.substring(0, index);
                element.html(typed);
                index++;
                if (index !== length) {
                    incrementText();
                } else {
                    finish();
                }
            }, typingSpeed);
        }
    }
};
