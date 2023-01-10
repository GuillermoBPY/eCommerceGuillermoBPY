//--------------------Funciones de Tipo Style---------------------

import "./stylescript.js"

///----------------------PRODUCTS DATA----------------------------------------------

const maindata = [
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
  }
];
//localStorage.setItem("tarjetas", JSON.stringify(tarjetas));

localStorage.setItem("data", JSON.stringify(maindata))
let data = JSON.parse(localStorage.getItem("data"))
let items = JSON.parse(localStorage.getItem("newArray")) || [...data];
let cartObj = JSON.parse(localStorage.getItem("cartObj")) || {};
////---------------------------------------PRODUCTS HOME / GRID---------------------------------------

//-----Funcionalidad Boton Add to Cart del Home-----

const btnAddToCart = document.querySelector(".btnaddtocart");

btnAddToCart.addEventListener("click", function (e) {
  const selectProduct = items.find((item) => item.id == e.target.id);
  addproduct (selectProduct)
  printProductsInCart();
});
const productsGridModels = document.querySelector(".productsgrid__models");
const productsGridCards = document.querySelector(".productsgrid__cards");


//-----Imprime productos en la grid segun el modelo-----

productsGridModels.addEventListener("click", function (e) {
  let target = e.target.parentElement.id;
  if (items.some((e) => {return e.name === target;})) {
    let i = items.filter((e) => e.name === target);
    printGrid(i)
  } else if (target === "Showall") {
    printGrid(items);
  }
});

//-----Function para Imprimir Productos en la Grid-----

function printGrid(items) {
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

////---------------------------------------PRODUCTS IN CART---------------------------------------

//-----Function Suma cantidad en el carrito-----

function addproduct (selectProduct){
  if (selectProduct.quantity === 0) {
    return alert("Cantidad no disponible!");
  }
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
}

//-----Crear objeto cart con los productos seleccionados-----

productsGridCards.addEventListener("click", function (e) {
  if (e.target.classList.contains("bx-plus")) {
    let idParent = e.target.parentElement.id;
    let selectProduct = items.find((item) => item.id == idParent);
    addproduct(selectProduct)
    printProductsInCart();

  }
});

//-----Visualidad cantidad de items en el SHOPPBAGICON/SPAN-----
const amountCart = document.querySelector(".shoppingbagspan");
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

//-----Imprime en el carrito los productos en el objeto-----

const myCartBody = document.querySelector(".mycart__body");

function printProductsInCart() {
  let html = "";
  const cartActual = Object.values(cartObj);
  cartActual.forEach(function ({id,name,price,image,alt,quantity,amount}) {
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
  localStorage.setItem("cartObj", JSON.stringify(cartObj));
  printAmountValue();
  printTotalCart();
}

//-----Funcionalidad de los botones del Cart-----

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
    addproduct (selectProduct)
  }
  if (e.target.classList.contains("bx-trash")) {
    const eliminar = confirm("Desea eliminar este producto?");
    if (eliminar) delete cartObj[idParent];
  }
  printProductsInCart();
});

//------------------------CHECKOUT------------------------

const myCartCheckout = document.querySelector(".mycart__checkout");

//-----Function Suma cantidad en el carrito-----

function printTotalCart() {
  const cartActual = Object.values(cartObj);

  if (!cartActual.length) {
    myCartBody.innerHTML = `
        <figure class="mycart__body--empty" style="max-width: 400px; align-self: center;">
          <img  src="./src/img/cartempty.png" alt="emptycart">
        </figure> `;
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

//-----Funcionalidad Boton Check Out del Cart-----

myCartCheckout.addEventListener("click", function (e) {
  if (e.target.classList.contains("mycart__checkout--btn")) {
    const cartActual = Object.values(cartObj);
    if (!cartActual.length) return alert("Su carrito esta vacio!");
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
    localStorage.setItem("newArray", JSON.stringify(newArray))
    items =  JSON.parse(localStorage.getItem("newArray"));
    cartObj = {};
  }

  alert("Gracias por su compra!");
  printGrid(items);
  printProductsInCart();
});

printGrid(items);
printProductsInCart();




