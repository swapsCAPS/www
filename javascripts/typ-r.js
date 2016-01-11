(function(global, $){
// TODO Re-usability
// TODO Variable typing speed for , . ! ? etc. Looks more natural
// TODO Cursor at end of typing text
// TODO Validate if we have jQuery

var TypR = function() {
    return new TypR.init();
};

function encodedChar(c) {
    if (c === "<") {
        return "&lt;";
    }
    if (c === ">") {
        return "&gt;";
    } else {
        return c;
    }
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

function dropElement(element) {
    setTimeout(function() {
        TweenLite.to(element, 1.5, {
            ease: Bounce.easeOut,
            y: "250%"
        });
    }, 1989);
}


// Teh prototype
TypR.prototype = {

    /**
     * Pass an id. This will then type out all children with class="type-anim"
     * sequentially
     */
    typeChildren: function(outerElement) {
        var self = this;
        var textArray = []; // save the original text
        var elementObjects = []; // collection of jQuery objects
        // get all elements
        var elements = $("#" + outerElement).find("*"); // * is required
        // populate arrays with text and elements
        for(var i = 0; i < elements.length; i++) {
            var elementObject = $(elements[i]); // get jQuery object
            if(elementObject.hasClass("type-anim")) { // only type if has class
                // push stuff to arrays
                textArray.push(elementObject.text());
                elementObjects.push(elementObject);
                elementObject.text(""); // remove html
            }
        }
        // iterate over elements using callbacks
        var index = 0;
        function typeElements(){
            if(index !== elementObjects.length){
                self.typeElement(elementObjects[index], textArray[index], typeElements);
                index++;
            } else {
                // finished typing all elements, blink the cursor
                blinkCursor();
                // and drop the bye
                dropElement($("#bye-container"));
            }
        }
        // start typing sequentially
        typeElements();
    },

    typeElement: function(element, text, callback) {
        var length = text.length;
        var index = 0; // used to iterate over the text using charAt(index)
        var speedMin = 50; // the speed characters are appended
        var speedMax = 75; // the speed characters are appended
        var newElementPause = 500; // the timeout between typing a new element
        // wrapper function to iterate over the text var using the index var
        function doTehTyping() {
            // check if we still need to type
            if (index !== length) {
                // generate random typing speed
                var speed = Math.floor(Math.random() * speedMax) + speedMin;
                setTimeout(function() {
                    // get the current state of the  html in the element
                    var currentHTML = element.html();
                    // encode char so < and > become &lt; and &lt;
                    var character = encodedChar(text.charAt(index));
                    // append character to the html
                    var newHTML = currentHTML += character;
                    // set the elements html to new html
                    element.html(newHTML);
                    // increase the index
                    index++;
                    // call back to wrapper function
                    doTehTyping();
                }, speed);
            } else {
                setTimeout(function() {
                    callback();
                }, newElementPause);
            }
        }
        // Start typing the element
        doTehTyping();
    }

};

TypR.init = function() {
};

// This is where the proto of Typr.init is pointing at
TypR.init.prototype = TypR.prototype;

// Expose TypR to the outside world, alias TypR and Typer$
global.TypR = global.Typer$ = TypR;

})(window, jQuery);
