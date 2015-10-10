function animateWithGSAP() {
    var $elements = $(".elem");

    var timeline = new TimelineLite({
        onComplete: loop
    });

    function loop() {
        timeline.restart();
    }

    // rotate up
    timeline.staggerTo($elements, 0.5, {
        backgroundColor: "#000",
        y: -200,
        rotation: 360,
        scale: 0.1
    }, 0.1);

    // rotate and turn purple
    timeline.to($elements, 0.5, {
        backgroundColor: "#9228DD",
        rotation: 180,
        borderRadius: "50%"
    });

    // move down, turn black
    timeline.to($elements, 0.5, {
        backgroundColor: "#000",
        y: -50,
        ease: Power2.easeIn,
        rotation: 45,
        scale: 0.4
    });

    // shake
    $elements.each(function() {
        timeline.to(this, 2, {
            x: -5,
            ease: RoughEase.ease.config({
                template: Power4.easeOut,
                strength: 1.5,
                points: 20,
                randomize: true,
            }),
        }, "shake");
    });

    // move left
    $elements.each(function(i) {
        var width = $(this).outerWidth(true);
        timeline.to(this, 0.5, {
            x: 1.6 * width * (0 - i),
            ease: Back.easeIn.config(1),
            delay: i * 0.2
        }, "moveLeft");
    });

    // drop
    $elements.each(function() {
        timeline.to(this, 1.5, {
            y: 60,
            ease: Bounce.easeOut,
            delay: getRandom(0.1, 0.9)
        }, "drop");
    });

    // move smoothly in a bezier curve
    timeline.to($elements, 10, {
        bezier: {
            curviness: 1.05,
            values: [{
                x: 100,
                y: 250
            }, {
                x: 0,
                y: 310
            }, {
                x: 200,
                y: 0
            }, {
                x: 300,
                y: 150
            }],
            autoRotate: false
        },
        backgroundColor: "#FFA800",
        ease: Power3.easeInOut
    });

    // move back to center
    $elements.each(function() {
        timeline.to(this, 0.5, {
            backgroundColor: "#000",
            y: 200,
            x: 0,
            rotation: 360,
            scale: 0.1,
            borderRadius: 0
        }, "prepareForRestart");
    });
}

$(document).ready(function() {
    animateWithGSAP();
});

function getRandom(min, max) {
    return (Math.random() * (max - min)) + min;
};