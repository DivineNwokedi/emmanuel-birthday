const beginButton = document.getElementById("beginButton");
const storySection = document.getElementById("story");

beginButton.addEventListener("click", function () {
    storySection.scrollIntoView({
        behavior: "smooth"
    });
});

// ==============================
// TIMELINE SCROLL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
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

    revealOnScroll.observe(element);

});

// ==============================
// LETTER OPEN / CLOSE
// ==============================

const openLetterButton = document.getElementById("openLetter");
const closeLetterButton = document.getElementById("closeLetter");
const letterWrapper = document.getElementById("letterWrapper");


openLetterButton.addEventListener("click", function () {

    letterWrapper.classList.add("open");

    document.body.style.overflow = "hidden";

});


closeLetterButton.addEventListener("click", function () {

    letterWrapper.classList.remove("open");

    document.body.style.overflow = "";

});

letterWrapper.addEventListener("click", function (event) {

    if (event.target === letterWrapper) {

        letterWrapper.classList.remove("open");

        document.body.style.overflow = "";

    }

});