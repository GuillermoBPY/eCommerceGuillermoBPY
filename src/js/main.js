//--------------------Funciones de Tipo Style---------------------

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
menuListItem.forEach((e) => e.addEventListener("click", removeShowMenu));
shopCartIcon.addEventListener("click", toggleShopCheckout);
shopCartIconX.addEventListener("click", removeCart);
darkMode.addEventListener("click", ChangeDarkMode);
window.onscroll = function () {
  HeadBarColorChange();
};

function removeCart() {
  shopCartCheckout.classList.toggle("showmycart");
}

function toggleShopCheckout() {
  shopCartCheckout.classList.toggle("showmycart");
}

function toggleShowMenu() {
  menuList.classList.toggle("showmenu");
}

function removeShowMenu() {
  menuList.classList.remove("showmenu");
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

///----------------------PRODUCTS DATA----------------------------------------------

const data = [
  {
    id: 1,
    name: "Hoodies",
    price: 14.0,
    image: "./src/img/featured1.png",
    alt: "featured1",
    category: "Hoodies",
    quantity: 10,
  },
  {
    id: 2,
    name: "Shirts",
    price: 24.0,
    image: "./src/img/featured2.png",
    alt: "featured2",
    category: "Shirts",
    quantity: 15,
  },
  {
    id: 3,
    name: "Sweatshirts",
    price: 24.0,
    image: "./src/img/featured3.png",
    alt: "featured3",
    category: "Sweatshirts",
    quantity: 20,
  },
];
let items = [...data];
let cartObj = {};
///----------------------PRODUCTS GRID ----------------------------------------------

const productsGridModels = document.querySelector(".productsgrid__models");
const productsGridCards = document.querySelector(".productsgrid__cards");

//Imprime productos por Tipo Seleccionado

productsGridModels.addEventListener("click", function (e) {
  let html = "";
  let target = e.target.parentElement.id;

  if (
    items.some((e) => {
      return e.name === target;
    })
  ) {
    let i = items.filter((e) => e.name === target);
    html += ` 
            <div class="productsgrid__card">
                <figure class="card__figure">
                  <img src=${i[0].image} alt=${i[0].alt}>
                  <span id="${i[0].id}" class="card__addcircle"><i class='bx bx-plus'></i></span>
                </figure>
                <div class="card__info">
                  <p>$${i[0].price} <span>| Stock: ${i[0].quantity}</span></p>
                  <p>${i[0].name}</p>
                </div>
            </div>`;
    productsGridCards.innerHTML = html;
  } else if (target === "Showall") {
    printGrid();
  }
});

// Imprime Todos los Productos en la Products Grid
function printGrid() {
  let html = "";
  for (let i of items) {
    html += ` 
              <div class="productsgrid__card">
                  <figure class="card__figure">
                    <img src=${i.image} alt=${i.alt}>
                    <span id="${i.id}" class="card__addcircle"><i class='bx bx-plus'></i></span>
                  </figure>
                  <div class="card__info">
                    <p>$${i.price} <span>| Stock: ${i.quantity}</span></p>
                    <p>${i.name}</p>
                  </div>
              </div>`;
  }
  productsGridCards.innerHTML = html;
}

///----------------------CART----------------------------------------------

const addButton = document.querySelectorAll(".bx-plus");

//---Crear Objeto Cart con los producctos seleccionados------

productsGridCards.addEventListener("click", function (e) {
  if (e.target.classList.contains("bx-plus")) {
    let idParent = e.target.parentElement.id;
    let selectProduct = items.find((item) => item.id == idParent);
    if (selectProduct.quantity === 0) {
      return alert("Cantidad no disponible!");
    }
    if (cartObj[idParent]) {
      if (selectProduct.quantity === cartObj[idParent].amount) {
        alert("Cantidad no disponible!");
      } else {
        cartObj[idParent].amount++;
      }
    } else {
      cartObj[idParent] = {
        ...selectProduct,
        amount: 1,
      };
    }
    console.log(idParent);
    console.log(selectProduct);
    console.log(items);
    console.log(cartObj);
    printProductsInCart();
    printTotalCart();
    printAmountValue();
  }
});

//--------Imprime el Carrito

const myCartBody = document.querySelector(".mycart__body");

function printProductsInCart() {
  let html = "";

  const cartActual = Object.values(cartObj);

  cartActual.forEach(function ({
    id,
    name,
    price,
    image,
    alt,
    quantity,
    amount,
  }) {
    html += `
              <div class="mycart__body--prod">
                <figure class="mycart__body--prod--fig">
                  <img src=${image} alt=${alt}>
                </figure>
                <div class="mycart__body--prod--info">
                  <h3>${name}</h3>
                  <p>Stock: ${quantity} <span>| $${price}</span></p>
        <p>Subtotal: <span>$${price * amount}</span></p>
        <p><span  id=${id} class="spanbx-minus"><i class='bx bx-minus'></i></span> ${amount} units<span id=${id} class="spanbx-plus"><i
              class='bx bx-plus'></i></span><span id=${id} class="spanbx-trash"><i class='bx bx-trash'></i></span></p>
      </div>
    </div>
      `;
  });

  myCartBody.innerHTML = html;
  printAmountValue();
}

//--------------Funciones Botones del Cart

myCartBody.addEventListener("click", function (e) {
  const idParent = e.target.parentElement.id;
  let selectProduct = items.find((item) => item.id == idParent);

  if (e.target.classList.contains("bx-minus")) {
    if (cartObj[idParent].amount === 1) {
      const eliminar = confirm("Desea eliminar este producto?");
      if (eliminar) delete cartObj[idParent];
    } else {
      cartObj[idParent].amount--;
    }
  }
  if (e.target.classList.contains("bx-plus")) {
    if (selectProduct.quantity === cartObj[idParent].amount) {
      alert("Cantidad no disponible!");
    } else {
      cartObj[idParent].amount++;
    }
  }
  if (e.target.classList.contains("bx-trash")) {
    const eliminar = confirm("Desea eliminar este producto?");
    if (eliminar) delete cartObj[idParent];
  }

  printProductsInCart();
  printTotalCart();
  printAmountValue();
});

//------------------------CHECKOUT

const myCartCheckout = document.querySelector(".mycart__checkout");
const amountCart = document.querySelector(".shoppingbagspan");

// const amountCart = document.querySelector(".amountCart");

function printAmountValue() {
  let sum = 0;

  const arrayCart = Object.values(cartObj);

  if (!arrayCart.length) {
    amountCart.style.display = "none";
    return;
  }

  amountCart.style.display = "grid";

  arrayCart.forEach(function ({ amount }) {
    sum += amount;
  });

  amountCart.textContent = sum;
}

printAmountValue();
function printTotalCart() {
  const cartActual = Object.values(cartObj);

  if (!cartActual.length) {
    myCartBody.innerHTML = `
        <figure class="mycart__body--empty" style="max-width: 400px; align-self: center;">
          <img  src="./src/img/cartempty.png" alt="emptycart">
        </figure> `;
    myCartCheckout.innerHTML = `
  <div class="mycart__checkout--info">
    <p>0 items</p>
    <h3>$0.00</h3>
  </div>
  <button class="mycart__checkout--btn"><i class='bx bxs-check-shield'></i>Chechkout</button>
      `;
    return;
  }

  let sum = 0;
  let sumAmt = 0;

  cartActual.forEach(function ({ amount, price }) {
    sumAmt += amount;
    sum += amount * price;
  });

  myCartCheckout.innerHTML = `
  <div class="mycart__checkout--info">
    <p>${sumAmt} items</p>
    <h3>$${sum}</h3>
  </div>
  <button class="mycart__checkout--btn"><i class='bx bxs-check-shield'></i>Chechkout</button>
      `;
}

//-------------Boton Comprar------------------

const myCartCheckoutBtn = document.querySelector(".mycart__checkout--btn");

myCartCheckout.addEventListener("click", function (e) {
  if (e.target.classList.contains("mycart__checkout--btn")) {
    const res = confirm("Desea realizar la compra?");

    if (!res) return;

    let newArray = [];

    items.forEach(function (item) {
      if (item.id === cartObj[item.id]?.id) {
        newArray.push({
          ...item,
          quantity: item.quantity - cartObj[item.id].amount,
        });
      } else {
        newArray.push(item);
      }
    });

    items = newArray;
    cartObj = {};
  }

  alert("Gracias por su compra!");
  printGrid();
  printProductsInCart();
  printTotalCart();
  printAmountValue();
});

//-------------Boton Home --------------

const btnAddToCart = document.querySelector(".btnaddtocart");

btnAddToCart.addEventListener("click", function (e) {
  const selectProduct = items.find((item) => item.id == e.target.id);

  if (cartObj[selectProduct.id]) {
    if (selectProduct.quantity === cartObj[selectProduct.id].amount) {
      alert("Cantidad no disponible!");
    } else {
      cartObj[selectProduct.id].amount++;
    }
  } else {
    cartObj[selectProduct.id] = {
      ...selectProduct,
      amount: 1,
    };
  }

  printProductsInCart();
  printTotalCart();
  printAmountValue();
});

printGrid();
printProductsInCart();
printTotalCart();
printAmountValue();



const loading = document.querySelector(".loading")

setTimeout (function(){

  loading.style.display = "none";},3000)

