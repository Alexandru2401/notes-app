const openNav = document.getElementById("open");
const closeNav = document.getElementById("close");
const navbar = document.querySelector(".navbar");

closeNav.addEventListener("click", () => {
  closeNavbar();
});

function closeNavbar() {
  navbar.style.transform = "translateX(-200px)";
  navbar.style.transition = "0.5s ease-in";
  setTimeout(() => {
    openNav.style.visibility = "visible";
    openNav.style.zIndex = 100;
  }, 600);
}

openNav.addEventListener("click", () => {
  openNavbar();
});

function openNavbar() {
  navbar.style.transform = "translateX(0px)";
  navbar.style.transition = "0.5s ease-in";
  openNav.style.visibility = "hidden";
}
