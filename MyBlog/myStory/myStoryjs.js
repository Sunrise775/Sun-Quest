/* =====================================================
   MY STORY
   Scroll Reveal Animation
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements =
        document.querySelectorAll(".reveal");


    /*
     * Intersection Observer
     *
     * Detects when each chapter enters
     * the visitor's screen.
     */

    const observerOptions = {

        threshold: 0.15,

        rootMargin: "0px 0px -80px 0px"

    };


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        /*
                         * Stop observing after
                         * the animation has happened.
                         */

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            observerOptions
        );


    /*
     * Observe every story element
     */

    revealElements.forEach(element => {

        observer.observe(element);

    });

});
function openPhoto(image) {

    const lightbox = document.getElementById("photoLightbox");
    const fullPhoto = document.getElementById("fullPhoto");

    fullPhoto.src = image.src;
    fullPhoto.alt = image.alt;

    lightbox.classList.add("active");
}


function closePhoto() {

    const lightbox = document.getElementById("photoLightbox");

    lightbox.classList.remove("active");
}


/* Close when clicking the dark background */

document.getElementById("photoLightbox").addEventListener("click", function(event) {

    if (event.target === this) {
        closePhoto();
    }

});


/* Close with ESC */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closePhoto();
    }

});