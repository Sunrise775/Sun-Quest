

document.addEventListener("DOMContentLoaded", () => {

    const revealElements =
        document.querySelectorAll(".reveal");


    

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

                      

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            observerOptions
        );




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



document.getElementById("photoLightbox").addEventListener("click", function(event) {

    if (event.target === this) {
        closePhoto();
    }

});




document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closePhoto();
    }

});
