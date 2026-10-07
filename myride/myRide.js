/* =========================================
   JOURNEY MAP
========================================= */

const mapPoints = document.querySelectorAll(".map-point");
const journeyStories = document.querySelectorAll(".journey-story");
const motorcycle = document.getElementById("moto");




const motorcyclePositions = {

    buhangin: {
        left: "17%",
        top: "64%"
    },

    laswitan: {
        left: "53%",
        top: "29%"
    },

    enchanted: {
        left: "76%",
        top: "62%"
    }

};


/*
    Select Journey
*/

mapPoints.forEach(point => {

    point.addEventListener("click", function () {

        const journeyName = this.dataset.journey;


        /* Remove active state */

        mapPoints.forEach(item => {
            item.classList.remove("active");
        });


        journeyStories.forEach(story => {
            story.classList.remove("active");
        });


        /* Activate selected point */

        this.classList.add("active");


        /* Activate story */

        const selectedStory =
            document.getElementById(journeyName);

        if (selectedStory) {

            selectedStory.classList.add("active");

        }


        /* Move Miya */

        const position =
            motorcyclePositions[journeyName];

        if (position) {

            motorcycle.style.left =
                position.left;

            motorcycle.style.top =
                position.top;

        }


        /* Scroll to story */

        setTimeout(() => {

            selectedStory.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 250);

    });

});


/* =========================================
   PHOTO LIGHTBOX
========================================= */

function openPhoto(image) {

    const lightbox =
        document.getElementById("photoLightbox");

    const fullPhoto =
        document.getElementById("fullPhoto");


    fullPhoto.src = image.src;

    fullPhoto.alt = image.alt;


    lightbox.classList.add("active");


    document.body.style.overflow = "hidden";
}


function closePhoto() {

    const lightbox =
        document.getElementById("photoLightbox");


    lightbox.classList.remove("active");


    document.body.style.overflow = "";
}


/* Close lightbox when clicking background */

document
    .getElementById("photoLightbox")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closePhoto();

        }

    });


/* =========================================
   VIDEO MODAL
========================================= */


function getYouTubeId(source) {

    const match = source.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/
    );

    if (match) return match[1];

    /* Plain 11-character video ID */
    if (/^[\w-]{11}$/.test(source)) return source;

    return null;
}




function getStartSeconds(source) {

    const match = source.match(/[?&](?:t|start)=([\dhms]+)/i);

    if (!match) return 0;

    const value = match[1];

    if (/^\d+$/.test(value)) return parseInt(value, 10);

    const parts = value.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i);

    return (parseInt(parts[1] || 0, 10) * 3600) +
           (parseInt(parts[2] || 0, 10) * 60) +
           parseInt(parts[3] || 0, 10);
}


function openVideo(videoSource) {

    const modal =
        document.getElementById("videoModal");

    const video =
        document.getElementById("journeyVideo");

    const youtube =
        document.getElementById("youtubePlayer");


    const isFile = /\.(mp4|webm|ogg)$/i.test(videoSource);

    const youtubeId = isFile ? null : getYouTubeId(videoSource);


    if (youtubeId) {

       

        if (location.protocol === "file:") {

            window.open(
                "https://www.youtube.com/watch?v=" + youtubeId,
                "_blank"
            );

            return;

        }


        video.hidden = true;

        youtube.hidden = false;

        youtube.src =
            "https://www.youtube-nocookie.com/embed/" +
            youtubeId +
            "?autoplay=1&playsinline=1&rel=0&start=" +
            getStartSeconds(videoSource);

    } else {

        youtube.hidden = true;

        video.hidden = false;

        video.src = videoSource;

        video.play().catch(() => {
            /* Browser may require manual play */
        });

    }


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeVideo() {

    const modal =
        document.getElementById("videoModal");

    const video =
        document.getElementById("journeyVideo");

    const youtube =
        document.getElementById("youtubePlayer");


    /* Stop YouTube */

    youtube.src = "";

    youtube.hidden = true;


    /* Stop local video */

    video.pause();

    video.removeAttribute("src");

    video.load();

    video.hidden = true;


    modal.classList.remove("active");

    document.body.style.overflow = "";
}


/* Close video when clicking background */

document
    .getElementById("videoModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeVideo();

        }

    });


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closePhoto();

        closeVideo();

    }

});