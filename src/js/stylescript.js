const menuButton = document.querySelector(".bx-customize");
const closeMenuButton = document.querySelector(".bx-x");
const menuList = document.querySelector(".header__nav--menu");
const menuListItem = document.querySelectorAll(".header__nav--menuitem");
const shopCartIcon = document.querySelector(".bx-shopping-bag");
const shopCartIconX = document.querySelector(".mycart-bx-x");
const shopCartCheckout = document.querySelector(".header__mycart");
const darkMode = document.querySelector("#darkbttn");
const headerBar = document.querySelector(".header");
const headerOffsetTop = headerBar.offsetTop;

menuButton.addEventListener("click", toggleShowMenu);
closeMenuButton.addEventListener("click", toggleShowMenu);
menuListItem.forEach((e) => e.addEventListener("click", toggleShowMenu));
shopCartIcon.addEventListener("click", toggleShopCheckout);
shopCartIconX.addEventListener("click", toggleShopCheckout);
darkMode.addEventListener("click", ChangeDarkMode);
window.onscroll = function () {
  HeadBarColorChange();
};

function toggleShopCheckout() {
  shopCartCheckout.classList.toggle("showmycart");
}

function toggleShowMenu() {
  menuList.classList.toggle("showmenu");
}

function ChangeDarkMode() {
  document.body.classList.toggle("dark-mode");
  changeIcon();
}

function changeIcon() {
  darkMode.classList.contains("bx-moon")
    ? darkMode.classList.replace("bx-moon", "bx-sun")
    : darkMode.classList.replace("bx-sun", "bx-moon");
}

function HeadBarColorChange() {
  window.pageYOffset > headerOffsetTop
    ? headerBar.classList.add("bgccolor")
    : headerBar.classList.remove("bgccolor");
}


const body = document.querySelector("body")
const loading = document.querySelector(".loading");

setTimeout(function () {
  loading.style.display = "none";
  body.style.overflow = "visible";
}, 3000);