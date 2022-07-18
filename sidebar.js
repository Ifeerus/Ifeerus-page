const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".header-menu__menu");

var menuOpen = false;
menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
        menuBtn.classList.add("open");
        menu.classList.add("active");
        document.querySelector("body").classList.add("lock");
        menuOpen = true;
    } else {
        menuBtn.classList.remove("open");
        menu.classList.remove("active");
        document.querySelector("body").classList.remove("lock");
        menuOpen = false;
    }
});


const menuLinks = document.querySelectorAll(".header-menu__link");

for(var i=0; i<menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", () => {
        if (menuOpen) {
            menuBtn.classList.remove("open");
            menu.classList.remove("active");
            document.querySelector("body").classList.remove("lock");
            menuOpen = false;
        }
    });
}