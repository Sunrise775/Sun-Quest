/* =========================================
   SUN QUEST — LIFE TIMELINE JAVASCRIPT
========================================= */


/* =========================================
   STORY DATA
========================================= */

const stories = {

    1: {
        chapter: "CHAPTER 01",
        year: "CHILDHOOD • SURIGAO CITY",
        title: "Growing Up",

        content: `
            <p class="story-text">
                I grew up in <strong>Surigao City, Surigao del Norte,
                Philippines.</strong>
            </p>

            <p class="story-text">
                I was a shy and silent kid with a big dream.
                I wasn't the loudest person in the room, but I always
                had curiosity about the world outside.
            </p>

            <p class="story-text">
                Even as a child, I loved going outside and doing
                adventurous things. I wanted to explore, discover
                places and experience things for myself.
            </p>

            <p class="story-text">
                One of my strongest childhood memories was having
                a friend who shared the same mindset.
            </p>

            <p class="story-text">
                We would roam through the forest together and
                find our own little adventures.
            </p>

            <p class="story-text">
                Looking back, those moments became one of the
                <strong>core memories of my childhood.</strong>
                Maybe that's where my love for adventure really began.
            </p>
        `
    },


    2: {
        chapter: "CHAPTER 02",
        year: "SCHOOL • SNSU",
        title: "School Years",

        content: `
            <p class="story-text">
                When I went to college at
                <strong>Surigao Norte State University (SNSU)</strong>,
                I became even more interested in technology.
            </p>

            <p class="story-text">
                I was the kind of person who loved computers,
                gadgets and anything related to technology.
            </p>

            <p class="story-text">
                Gaming also became a big part of my life.
            </p>

            <p class="story-text">
                At that time, I had a dream of becoming a
                <strong>Software Developer or Software Engineer.</strong>
            </p>

            <p class="story-text">
                But things didn't turn out the way I expected.
                Eventually, I left college and stepped into the
                real world.
            </p>

            <p class="story-text">
                It wasn't the path I originally imagined,
                but it became the beginning of another chapter.
            </p>
        `
    },


    3: {
        chapter: "CHAPTER 03",
        year: "AGE 18 • FIRST JOB",
        title: "My First Job",

        content: `
            <p class="story-text">
                At the age of <strong>18</strong>, I became a worker.
            </p>

            <p class="story-text">
                My first job was as a
                <strong>store merchandiser.</strong>
            </p>

            <p class="story-text">
                That was when I learned something school could
                never fully teach me:
                <strong>working life is not easy.</strong>
            </p>

            <p class="story-text">
                There were days when I realized that the things
                I used to think were difficult in college were
                actually much easier than working for a living.
            </p>

            <p class="story-text">
                I had regrets about leaving college.
                But those regrets also became part of the person
                I was becoming.
            </p>

            <p class="story-text">
                I had entered the real world.
                And there was no turning back.
            </p>
        `
    },


    4: {
        chapter: "CHAPTER 04",
        year: "THE TURNING POINT",
        title: "Finding My Path",

        content: `
            <p class="story-text">
                One of the biggest decisions I made was leaving
                my comfort zone.
            </p>

            <p class="story-text">
                I decided to work outside my city because I wanted
                to earn more, gain experience and see what else
                I could do with my life.
            </p>

            <p class="story-text">
                I didn't know exactly where this road would take me.
            </p>

            <p class="story-text">
                Then something unexpected happened.
            </p>

            <p class="story-text">
                I started learning how to operate
                <strong>heavy machinery and mining equipment.</strong>
            </p>

            <p class="story-text">
                What started as a step outside my comfort zone
                slowly became a new direction in my life.
            </p>
        `
    },


    5: {
        chapter: "CHAPTER 05",
        year: "THE CHALLENGE",
        title: "The Hard Years",

        content: `
            <p class="story-text">
                Leaving home and working somewhere outside my city
                wasn't easy.
            </p>

            <p class="story-text">
                It meant leaving the familiar behind and learning
                how to handle life on my own.
            </p>

            <p class="story-text">
                There were difficult moments, uncertainty and
                situations that made me question whether I was
                going in the right direction.
            </p>

            <p class="story-text">
                But every difficult experience taught me something.
            </p>

            <p class="story-text">
                I learned to adapt.
                I learned to work.
                I learned to keep moving.
            </p>

            <p class="story-text">
                And slowly, things started going my way.
            </p>
        `
    },


    6: {
        chapter: "CHAPTER 06",
        year: "FAMILY",
        title: "The People Behind Me",

        content: `
            <p class="story-text">
                The most important people in my life are
                <strong>my family.</strong>
            </p>

            <p class="story-text">
                They had doubts when I didn't finish college.
                They probably wondered what would happen to me
                after choosing a different path.
            </p>

            <p class="story-text">
                But despite those doubts,
                they continued to support me.
            </p>

            <p class="story-text">
                They supported me <strong>100%.</strong>
            </p>

            <p class="story-text">
                Their support taught me something important:
                sometimes people may not understand your path
                completely, but they can still believe in you.
            </p>

            <p class="story-text">
                My family influenced me to never surrender,
                to keep thriving and to keep moving forward
                even when life becomes difficult.
            </p>
        `
    },


    7: {
        chapter: "CHAPTER 07",
        year: "TODAY • UNDERGROUND",
        title: "The Operator",

        content: `
            <p class="story-text">
                Today, I work as an
                <strong>underground equipment operator.</strong>
            </p>

            <p class="story-text">
                It is a completely different life from the one
                I imagined when I was studying computers and dreaming
                about becoming a software engineer.
            </p>

            <p class="story-text">
                But I've learned to appreciate the road that brought
                me here.
            </p>

            <p class="story-text">
                I stepped outside my comfort zone.
                I learned new skills.
                I worked hard.
            </p>

            <p class="story-text">
                And now I can look back and say that
                <strong>I'm doing fine.</strong>
            </p>

            <p class="story-text">
                I don't spend my days worrying about the future.
                I'm focused on continuing to build my life.
            </p>
        `
    },


    8: {
        chapter: "CHAPTER 08",
        year: "LIFE LESSONS",
        title: "Things I Learned",

        content: `
            <p class="story-text">
                Life taught me that things don't always happen
                according to the plan you make.
            </p>

            <p class="story-text">
                Sometimes the road you wanted disappears,
                and another road appears in front of you.
            </p>

            <p class="story-text">
                I've learned that leaving your comfort zone can
                be scary, but it can also be where you discover
                what you're capable of.
            </p>

            <p class="story-text">
                I've learned that regret doesn't have to be
                the end of the story.
                It can become motivation to do better.
            </p>

            <p class="story-text">
                Most importantly, I've learned:
                <strong>when life throws something at you,
                don't surrender.</strong>
            </p>

            <p class="story-text">
                Take it.
                Face it.
                Learn from it.
                And keep moving.
            </p>
        `
    },


    9: {
        chapter: "CHAPTER 09",
        year: "THE PRESENT",
        title: "Where I Am Now",

        content: `
            <p class="story-text">
                Today, I'm in a place where I feel comfortable
                with the person I've become.
            </p>

            <p class="story-text">
                I'm an underground equipment operator.
                I'm still learning.
                I'm still working.
                And I'm still exploring life.
            </p>

            <p class="story-text">
                My life may not have followed the original plan,
                but that doesn't mean the journey failed.
            </p>

            <p class="story-text">
                In many ways, the unexpected road brought me
                experiences I never would have had otherwise.
            </p>

            <p class="story-text">
                And I'm not finished yet.
            </p>
        `
    },


    10: {
        chapter: "CHAPTER 10",
        year: "THE DREAM",
        title: "The Dream",

        content: `
            <p class="story-text">
                There is still one dream that stays in my mind.
            </p>

            <p class="story-text">
                I want to travel around the world
                <strong>alone on a motorcycle.</strong>
            </p>

            <p class="story-text">
                I want to follow the roads that I've never seen,
                explore places I've never been and experience
                the world for myself.
            </p>

            <p class="story-text">
                I've been inspired by people who chose the road
                and made a life out of exploring the world.
            </p>

            <p class="story-text">
                One day, I want to become the person
                I've always dreamed of becoming.
            </p>

            <p class="story-text">
                Not because life was easy,
                but because I kept moving when it wasn't.
            </p>
        `
    },


    11: {
        chapter: "FINAL CHAPTER",
        year: "THE ROAD AHEAD",
        title: "The Journey Continues",

        content: `
            <p class="story-text">
                Looking back, my life hasn't followed the road
                I originally imagined.
            </p>

            <p class="story-text">
                I wanted to become a software engineer.
                I left college.
                I became a worker.
                I left my comfort zone.
                I learned heavy equipment.
                And now I'm an underground equipment operator.
            </p>

            <p class="story-text">
                Somewhere along the way, I discovered something
                that was already inside me since childhood:
                <strong>the desire to explore.</strong>
            </p>

            <p class="story-text">
                From the forests of my childhood to the roads
                I ride today, the adventure has always been there.
            </p>

            <p class="story-text">
                I don't know exactly where the road will take me.
            </p>

            <p class="story-text">
                But I know I want to keep moving.
            </p>

            <p class="story-text">
                There are still roads I've never ridden,
                places I've never seen, and stories waiting
                to be written.
            </p>

            <p class="story-text">
                And someday, I hope to ride far beyond
                the roads I know today.
            </p>

            <p class="story-text">
                <strong>The dream is still alive.</strong>
            </p>

            <p class="story-text">
                One road.
                One motorcycle.
                One life.
            </p>

            <p class="story-text">
                <strong>One mile at a time.</strong>
            </p>
        `
    }

};


/* =========================================
   ELEMENTS
========================================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");

const walker =
    document.getElementById("walker");

const modal =
    document.getElementById("storyModal");

const closeModal =
    document.getElementById("closeModal");

const modalChapter =
    document.getElementById("modalChapter");

const modalYear =
    document.getElementById("modalYear");

const modalTitle =
    document.getElementById("modalTitle");

const modalStory =
    document.getElementById("modalStory");


/* =========================================
   OPEN STORY
========================================= */

function openStory(chapterNumber) {

    const story = stories[chapterNumber];

    if (!story) return;

    modalChapter.textContent = story.chapter;

    modalYear.textContent = story.year;

    modalTitle.textContent = story.title;

    modalStory.innerHTML = story.content;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE STORY
========================================= */

function closeStory() {

    modal.classList.remove("show");

    document.body.style.overflow = "";
}


/* =========================================
   BUTTON EVENTS
========================================= */

const storyButtons = document.querySelectorAll(".open-story");

storyButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        // Prevent the timeline card click
        event.stopPropagation();

        // Find the chapter containing this button
        const item = this.closest(".timeline-item");

        if (!item) return;

        // Get chapter number
        const chapterNumber = item.getAttribute("data-chapter");

        // Open the correct story
        openStory(chapterNumber);

    });

});


/* =========================================
   TIMELINE ITEM CLICK
========================================= */

timelineItems.forEach(item => {

    item.addEventListener("click", function(event) {

        // Don't interfere with the Explore Chapter button
        if (event.target.closest(".open-story")) {
            return;
        }

        timelineItems.forEach(other => {
            other.classList.remove("active");
        });

        this.classList.add("active");

        moveWalker(this);

        centerItem(this);

    });

});


/* =========================================
   WALKER MOVEMENT
========================================= */

function moveWalker(item) {

    if (!walker) return;

    const itemCenter =
        item.offsetLeft + (item.offsetWidth / 2);

    const walkerPosition =
        itemCenter - 27;

    walker.style.left =
        `${walkerPosition}px`;

}


/* =========================================
   CLOSE MODAL
========================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeStory
    );

}


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {
                closeStory();
            }

        }
    );

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeStory();
        }

    }
);


/* =========================================
   INITIAL WALKER POSITION
========================================= */

window.addEventListener(
    "load",
    function() {

        const firstItem =
            document.querySelector(
                ".timeline-item.active"
            );

        if (firstItem) {
            moveWalker(firstItem);
        }

    }
);


/* =========================================
   HORIZONTAL TIMELINE SCROLLING
========================================= */

const timelineWrapper =
    document.getElementById("timelineWrapper");


/* Scroll a chapter into the middle of the screen */

function centerItem(item) {

    if (!timelineWrapper) return;

    const target =
        item.offsetLeft -
        (timelineWrapper.clientWidth - item.offsetWidth) / 2;

    timelineWrapper.scrollTo({
        left: target,
        behavior: "smooth"
    });

}


if (timelineWrapper) {

    /* ---- Mouse wheel: up/down wheel scrolls sideways ---- */

    timelineWrapper.addEventListener(
        "wheel",
        function (event) {

            /* Sideways trackpad swipes already work */
            if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
                return;
            }

            const maxScroll =
                timelineWrapper.scrollWidth -
                timelineWrapper.clientWidth;

            const goingRight = event.deltaY > 0;

            const canScroll =
                goingRight
                    ? timelineWrapper.scrollLeft < maxScroll - 1
                    : timelineWrapper.scrollLeft > 0;

            /* At either end, let the page scroll normally */
            if (!canScroll) return;

            event.preventDefault();

            /* Firefox can report wheel movement in lines */
            const amount =
                event.deltaMode === 1
                    ? event.deltaY * 32
                    : event.deltaY;

            timelineWrapper.scrollLeft += amount;

        },
        { passive: false }
    );


    /* ---- Click and drag with a mouse ---- */

    let isDown = false;
    let dragged = false;
    let startX = 0;
    let startScroll = 0;

    timelineWrapper.addEventListener("pointerdown", function (event) {

        if (event.pointerType !== "mouse" || event.button !== 0) return;

        isDown = true;
        dragged = false;

        startX = event.clientX;
        startScroll = timelineWrapper.scrollLeft;

    });

    window.addEventListener("pointermove", function (event) {

        if (!isDown) return;

        const distance = event.clientX - startX;

        if (Math.abs(distance) > 5) {

            dragged = true;

            timelineWrapper.classList.add("dragging");

        }

        if (dragged) {

            timelineWrapper.scrollLeft = startScroll - distance;

        }

    });

    function stopDrag() {

        isDown = false;

        timelineWrapper.classList.remove("dragging");

    }

    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    /* Don't treat the end of a drag as a click */

    timelineWrapper.addEventListener("click", function (event) {

        if (dragged) {

            event.stopPropagation();
            event.preventDefault();

            dragged = false;

        }

    }, true);


    /* ---- Arrow keys ---- */

    timelineWrapper.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {

            timelineWrapper.scrollBy({ left: 320, behavior: "smooth" });

        } else if (event.key === "ArrowLeft") {

            timelineWrapper.scrollBy({ left: -320, behavior: "smooth" });

        }

    });

}


/* Keep the walker in place if the screen size changes */

window.addEventListener("resize", function () {

    const active = document.querySelector(".timeline-item.active");

    if (active) moveWalker(active);

});
