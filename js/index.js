
let carts = document.querySelectorAll('.addToCart');
var quantityInputs = document.getElementsByClassName('cart-quantity-input');

let products = [
    {
        name: 'Mortal Kombat 11',
        tag: 'mortalkombat11',
        price: 20,
        inCart: 0,
        imageUrl: "images/mk11.jpg"
    },
    {
        name: 'Red Dead Redemption',
        tag: 'reddeadredemption',
        price: 40,
        inCart: 0,
        imageUrl: "images/game3.jpg"

    },
    {
        name: 'Sekiro',
        tag: 'sekiro',
        price: 80,
        inCart: 0,
        imageUrl: "images/game2.jpg"
    },
    {
        name: 'DOTA',
        tag: 'dota',
        price: 125,
        inCart: 0,
        imageUrl: "images/dota.png"
    },
    {
        name: 'League of Legend',
        tag: 'leagueoflegend',
        price: 100,
        inCart: 0,
        imageUrl: "images/league.png"

    },
    {
        name: 'God of War',
        tag: 'godofwar',
        price: 200,
        inCart: 0,
        imageUrl: "images/gow.png"
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = +localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.card-count').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = +localStorage.getItem('cartNumber');

    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    if (action == "decrease") {
        localStorage.setItem('cartNumber', productNumbers - 1);
        document.querySelector('.card-count').textContent = productNumbers - 1;
    } else if (productNumbers) {
        localStorage.setItem("cartNumber", productNumbers + 1);
        document.querySelector('.card-count').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumber', 1);
        document.querySelector('.card-count').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = +localStorage.getItem('totalCost');

    if (cartCost != null) {
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let subTotal = document.querySelector('.sub-total-price');
    let purchasedProducts = document.querySelector('.purchased-producrs');
    let orderNumber = document.querySelector('.order-number');
    let grandTotal = document.querySelector('.final-price');
    let cartCost = +localStorage.getItem('totalCost');

    if (subTotal) {
        subTotal.innerHTML = `<p>$${cartCost}</p>`;
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const orderTrackNumber = randomInteger(1, 1000);
    if (orderNumber) {
        orderNumber.innerHTML = `<span>Order #00000${orderTrackNumber}</span>`
    }

    const taxAmount = 25;
    let finalPrice = cartCost - taxAmount;
    if (grandTotal) {
        grandTotal.innerHTML = `<p>$${finalPrice}</p>`;
    }
    let productContainer = document.querySelector('.cart-items');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-row">
            <div class="cart-item cart-column">
              <img class="cart-item-image" src=${item.imageUrl} alt=${item.name} width="100" height="100">
              <span class="cart-item-title">${item.name}</span>
            </div>
            <span class="cart-price cart-column">$${item.inCart * item.price}</span>
            <div class="cart-quantity cart-column">
                <i class="fas fa-minus-circle"></i>
                <p><span>${item.inCart}</span></p>
                <i class="fas fa-plus"></i>
              <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
          </div>
            `
        });
    }
    if (cartItems && purchasedProducts) {
        purchasedProducts.innerHTML = '';
        Object.values(cartItems).map(item => {
            purchasedProducts.innerHTML += `
            <div class="products-purchased">
            <div class="pro">
            <div class="left-part">
            <img src=${item.imageUrl} alt=${item.name}>
          </div>
          <div class="right-part">
            <p>Name: ${item.name}</p>
            <p>Quantity: ${item.inCart}</p>
          </div>
            </div>
          </div>
            `
        });
    }
    deleteButtons();
    manageQuantity();
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.btn-danger');
    let productName;
    let productNumbers = localStorage.getItem('cartNumber');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.parentElement.querySelector('.cart-item-title').textContent.trim().toLowerCase().replace(/ /g, '');
            localStorage.setItem('cartNumber', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));
            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }

}
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.fa-minus-circle');
    let increaseButtons = document.querySelectorAll('.fa-plus');

    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;

            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('.cart-item-title').textContent.trim().toLowerCase().replace(/ /g, '');
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");

                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }

        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            console.log('increase');
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('.cart-item-title').textContent.trim().toLowerCase().replace(/ /g, '');
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);

            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        })
    }

}
onLoadCartNumbers();
displayCart();
