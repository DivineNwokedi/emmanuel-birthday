/* ==========================================
   BEGIN OUR STORY
========================================== */

const beginButton = document.getElementById("beginButton");
const storySection = document.getElementById("story");

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

let musicPlaying = false;


/*
   When Emmanuel clicks
   "Begin our story":

   1. The story scrolls into view
   2. The music begins
*/

beginButton.addEventListener("click", function () {

    storySection.scrollIntoView({
        behavior: "smooth"
    });


    music.volume = 0.35;


    music.play()
        .then(function () {

            musicPlaying = true;

            musicToggle.textContent = "♫";

            musicToggle.classList.add("playing");

        })
        .catch(function () {

            /*
                Some browsers may still prevent
                audio playback.

                If that happens, the user can
                press the music button manually.
            */

            console.log("Music playback was blocked.");

        });

});



/* ==========================================
   MUSIC TOGGLE
========================================== */

musicToggle.addEventListener("click", function () {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicToggle.textContent = "♪";

        musicToggle.classList.remove("playing");

    }

    else {

        music.play()
            .then(function () {

                musicPlaying = true;

                musicToggle.textContent = "♫";

                musicToggle.classList.add("playing");

            })
            .catch(function () {

                console.log("Music could not be played.");

            });

    }

});



/* ==========================================
   STORY TEXT ANIMATION
========================================== */

const storyLines = document.querySelectorAll(".story-line");

const storyObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("story-visible");

            }

        });

    },

    {
        threshold: 0.35
    }

);


storyLines.forEach(function (line) {

    storyObserver.observe(line);

});



/* ==========================================
   GENERAL SCROLL REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* ==========================================
   LETTER
========================================== */

const openLetterButton =
    document.getElementById("openLetter");

const closeLetterButton =
    document.getElementById("closeLetter");

const letterWrapper =
    document.getElementById("letterWrapper");



/*
   OPEN LETTER
*/

openLetterButton.addEventListener("click", function () {

    letterWrapper.classList.add("open");

    document.body.style.overflow = "hidden";

});



/*
   CLOSE LETTER
*/

closeLetterButton.addEventListener("click", function () {

    letterWrapper.classList.remove("open");

    document.body.style.overflow = "";

});



/*
   CLOSE WHEN CLICKING
   OUTSIDE THE LETTER
*/

letterWrapper.addEventListener("click", function (event) {

    if (event.target === letterWrapper) {

        letterWrapper.classList.remove("open");

        document.body.style.overflow = "";

    }

});



/* ==========================================
   ESCAPE KEY CLOSES LETTER
========================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        letterWrapper.classList.remove("open");

        document.body.style.overflow = "";

    }

});