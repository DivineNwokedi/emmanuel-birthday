/* =========================================
   BACKGROUND MUSIC
========================================= */

const birthdayMusic =
    document.getElementById("birthdayMusic");

let musicStarted = false;


/* Start music */

function startMusic() {

    if (musicStarted) return;

    birthdayMusic.volume = 0.35;

    const playPromise =
        birthdayMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(function () {

                musicStarted = true;

            })
            .catch(function (error) {

                console.log(
                    "Music could not autoplay yet:",
                    error
                );

            });

    }

}


/* =========================================
   BEGIN BUTTON
========================================= */

const beginButton =
    document.getElementById("beginButton");

const storySection =
    document.getElementById("story");


beginButton.addEventListener(
    "click",
    function () {

        /*
         * Start music here because this click
         * counts as a user interaction.
         */

        startMusic();


        /*
         * Then take the user to the story.
         */

        storySection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   COSMIC CONSTELLATION
========================================= */

const canvas =
    document.getElementById(
        "constellationCanvas"
    );

const ctx =
    canvas.getContext("2d");

let stars = [];

let animationFrame;


/* Resize canvas */

function resizeCanvas() {

    const section =
        document.querySelector(
            ".story-cosmos"
        );

    canvas.width =
        section.clientWidth;

    canvas.height =
        section.clientHeight;

}


/* Create stars */

function createStars() {

    stars = [];

    const numberOfStars =
        window.innerWidth < 700
            ? 35
            : 65;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        stars.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() * 1.7 + 0.5,

            opacity:
                Math.random() * 0.5 + 0.25,

            speed:
                Math.random() * 0.02 + 0.005,

            twinkle:
                Math.random() *
                Math.PI *
                2

        });

    }

}


/* Draw stars */

function drawStars(time) {

    stars.forEach(function (star) {

        const twinkle =
            Math.sin(
                time * star.speed +
                star.twinkle
            ) * 0.25;

        const opacity =
            star.opacity +
            twinkle;


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(24, 60, 50, ${opacity})`;

        ctx.fill();

    });

}


/* =========================================
   TWO MAIN CONSTELLATION STARS
========================================= */

let mainStarOne = {
    x: 0,
    y: 0
};

let mainStarTwo = {
    x: 0,
    y: 0
};


/* Position main stars */

function positionMainStars() {

    mainStarOne = {

        x:
            canvas.width * 0.27,

        y:
            canvas.height * 0.42

    };

    mainStarTwo = {

        x:
            canvas.width * 0.73,

        y:
            canvas.height * 0.58

    };

}


/* Draw glowing star */

function drawMainStar(
    star,
    pulse
) {

    const glow =
        12 +
        Math.sin(pulse) *
        4;


    /* Glow */

    const gradient =
        ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            glow
        );


    gradient.addColorStop(
        0,
        "rgba(184,154,112,0.65)"
    );

    gradient.addColorStop(
        1,
        "rgba(184,154,112,0)"
    );


    ctx.beginPath();

    ctx.arc(
        star.x,
        star.y,
        glow,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        gradient;

    ctx.fill();


    /* Star itself */

    ctx.beginPath();

    ctx.arc(
        star.x,
        star.y,
        3.2,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#B89A70";

    ctx.fill();

}


/* =========================================
   CONNECTING LINES
========================================= */

function drawConnections() {

    const distance =
        Math.sqrt(

            Math.pow(
                mainStarTwo.x -
                mainStarOne.x,
                2
            )

            +

            Math.pow(
                mainStarTwo.y -
                mainStarOne.y,
                2
            )

        );


    if (
        distance <
        canvas.width * 0.7
    ) {

        ctx.beginPath();

        ctx.moveTo(
            mainStarOne.x,
            mainStarOne.y
        );

        ctx.lineTo(
            mainStarTwo.x,
            mainStarTwo.y
        );

        ctx.strokeStyle =
            "rgba(24, 60, 50, 0.22)";

        ctx.lineWidth = 1;

        ctx.stroke();

    }

}


/* =========================================
   CONSTELLATION ANIMATION
========================================= */

function animate(time) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    drawStars(time);


    /* Slowly move the two important stars */

    const movement =
        Math.sin(
            time * 0.0003
        ) * 18;


    const starOne = {

        x:
            mainStarOne.x +
            movement,

        y:
            mainStarOne.y +
            Math.cos(
                time * 0.00025
            ) * 12

    };


    const starTwo = {

        x:
            mainStarTwo.x -
            movement,

        y:
            mainStarTwo.y +
            Math.sin(
                time * 0.00025
            ) * 12

    };


    mainStarOne.x =
        starOne.x;

    mainStarOne.y =
        starOne.y;


    mainStarTwo.x =
        starTwo.x;

    mainStarTwo.y =
        starTwo.y;


    drawConnections();


    drawMainStar(
        mainStarOne,
        time * 0.002
    );


    drawMainStar(
        mainStarTwo,
        time * 0.002 + 2
    );


    animationFrame =
        requestAnimationFrame(
            animate
        );

}


/* =========================================
   INITIALISE COSMOS
========================================= */

function initialiseCosmos() {

    resizeCanvas();

    createStars();

    positionMainStars();

    cancelAnimationFrame(
        animationFrame
    );

    animationFrame =
        requestAnimationFrame(
            animate
        );

}


window.addEventListener(
    "resize",
    initialiseCosmos
);


/* =========================================
   STORY TEXT ANIMATION
========================================= */

const storyLines =
    document.querySelectorAll(
        ".story-line"
    );


const progressNumber =
    document.getElementById(
        "storyProgress"
    );


const progressFill =
    document.getElementById(
        "progressFill"
    );


const replayButton =
    document.getElementById(
        "replayStory"
    );


let currentStory = 0;

let storyTimer;

let storyStarted = false;


/* Show story line */

function showStoryLine(index) {

    storyLines.forEach(
        function (line, i) {

            line.classList.toggle(
                "active",
                i === index
            );

        }
    );


    currentStory =
        index;


    /* Update number */

    const number =
        String(
            index + 1
        ).padStart(
            2,
            "0"
        );


    progressNumber.textContent =
        number;


    /* Update progress */

    const percentage =
        (
            (index + 1) /
            storyLines.length
        ) * 100;


    progressFill.style.width =
        percentage + "%";


    /* Show replay at the end */

    if (
        index ===
        storyLines.length - 1
    ) {

        replayButton.classList.add(
            "show"
        );

    } else {

        replayButton.classList.remove(
            "show"
        );

    }

}


/* Start story */

function startStory() {

    clearInterval(
        storyTimer
    );

    storyStarted = true;

    currentStory = 0;

    showStoryLine(0);


    storyTimer =
        setInterval(
            function () {

                if (
                    currentStory <
                    storyLines.length - 1
                ) {

                    showStoryLine(
                        currentStory + 1
                    );

                } else {

                    clearInterval(
                        storyTimer
                    );

                }

            },
            5000
        );

}


/* Replay */

replayButton.addEventListener(
    "click",
    function () {

        replayButton.classList.remove(
            "show"
        );

        startStory();

    }
);


/* =========================================
   START STORY WHEN SECTION APPEARS
========================================= */

const storyObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting &&
                        !storyStarted
                    ) {

                        startStory();

                    }

                }
            );

        },
        {
            threshold: 0.35
        }
    );


storyObserver.observe(
    storySection
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealOnScroll =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    function (element) {

        revealOnScroll.observe(
            element
        );

    }
);


/* =========================================
   LETTER
========================================= */

const openLetterButton =
    document.getElementById(
        "openLetter"
    );


const closeLetterButton =
    document.getElementById(
        "closeLetter"
    );


const letterWrapper =
    document.getElementById(
        "letterWrapper"
    );


/* Open */

openLetterButton.addEventListener(
    "click",
    function () {

        letterWrapper.classList.add(
            "open"
        );

        document.body.style.overflow =
            "hidden";

    }
);


/* Close */

closeLetterButton.addEventListener(
    "click",
    function () {

        letterWrapper.classList.remove(
            "open"
        );

        document.body.style.overflow =
            "";

    }
);


/* Close by clicking outside */

letterWrapper.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            letterWrapper
        ) {

            letterWrapper.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================
   ESCAPE KEY FOR LETTER
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            letterWrapper.classList.contains(
                "open"
            )
        ) {

            letterWrapper.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================
   START
========================================= */

initialiseCosmos();