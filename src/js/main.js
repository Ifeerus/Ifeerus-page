const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

// nav close/open
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

// remove menu mobile
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

//according skills
const skillsContent = document.getElementsByClassName("skills__content"),
    skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }
    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";
    }
}

skillsHeader.forEach((element) => {
    element.addEventListener("click", toggleSkills);
});

//qual TABS
const tabs = document.querySelectorAll("[data-target]"),
    tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("qualification__active");
        });
        target.classList.add("qualification__active");

        tabs.forEach((tab) => {
            tab.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});

//MODALS SERVICES
const modalViews = document.querySelectorAll(".services__modal"),
    modalBtns = document.querySelectorAll(".services__button"),
    modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
        });
    });
});

// Portfolio SWIPER

let swiper = new Swiper(".mySwiper", {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// scroll sections active link

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active-link");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);

// Change bg COLOR
function scrollHeader() {
    const nav = document.getElementById("header");
    if (this.scrollY >= 80) {
        nav.classList.add("scroll-header");
    } else {
        nav.classList.remove("scroll-header");
    }
}

window.addEventListener("scroll", scrollHeader);

function scrollTop() {
    const scrollTop = document.getElementById("scroll-up");
    if (this.scrollY >= 560) {
        scrollTop.classList.add("show-scroll");
    } else {
        scrollTop.classList.remove("show-scroll");
    }
}
window.addEventListener("scroll", scrollTop);

// dark light theme
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
        iconTheme
    );
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

// sending message

const validation = (name, msg) => {
    if (name.trim().length === 0 || name.trim().length === 0) {
        return false;
    } else {
        return true;
    }
};

const TOKEN = "6041808216:AAHvzPNEHpsek9Vd60KjML-0MWy7z3C-_j8";
const CHAT_ID = "-1001885740727";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const notification = document.querySelector(".notification");

document.getElementById("tg").addEventListener("submit", function (e) {
    e.preventDefault();

    let message = `<b>Website request!</b>\n`;
    message += `<b>Name: </b> ${this.name.value}\n`;
    message += `<b>Email: </b> ${this.email.value}\n`;
    message += `<b>Message: </b> ${this.message.value}\n`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message,
        }),
    };

    if (validation(this.name.value, this.message.value)) {
        fetch(URI_API, options)
            .then((response) => response.json())
            .then(() => {
                notification.innerHTML =
                    '<h3 class="notification__message">Message sent <i class="uil uil-check-circle"></i></h3>';
                notification.classList.add("show-notif-success");
                setTimeout(() => {
                    notification.classList.remove("show-notif-success");
                }, 4000);
            })
            .catch((err) => {
                notification.innerHTML =
                    '<h3 class="notification__message">Sending error <i class="uil uil-times-circle"></i></h3>';
                notification.classList.add("show-notif-error");
                setTimeout(() => {
                    notification.classList.remove("show-notif-error");
                }, 4000);
            })
            .finally(() => {
                this.name.value = "";
                this.email.value = "";
                this.message.value = "";
            });
    } else {
        notification.innerHTML =
            '<h3 class="notification__message">Fill in all the fields <i class="uil uil-times-circle"></i></h3>';
        notification.classList.add("show-notif-error");
        setTimeout(() => {
            notification.classList.remove("show-notif-error");
        }, 4000);
        this.name.value = "";
        this.email.value = "";
        this.message.value = "";
    }
});
