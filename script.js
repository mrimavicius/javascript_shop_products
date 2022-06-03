const container = document.querySelector(".container")
const toolbarTotal = document.querySelector(".total")
const toolbarPrice = document.querySelector(".price")
const modalFooter = document.querySelector(".modal-footer")


let products = []
let cart = []

function shoppingCart() {
    const products = document.querySelector(".products");
    console.log(cart)
    
    products.innerHTML = ""

    cart.forEach(x => {
        const product = document.createElement("div")
        product.classList.add("product")
        product.innerHTML =
        `
            <img src="${x.image}">
            <p class="bold">${x.price} $</p>
            <div>Quantity:${x.quantity}</div>
            <p>${x.title}</p>
            <button id="${x.id}" class="delete"> X </button>
        `
        products.append(product)
    })

    const deleteBtns = document.querySelectorAll(".delete")
    deleteBtns.forEach(x => x.onclick = removeFromCart)


        
}

function updateToolbar() {
    toolbarTotal.innerHTML = "Total: " + cart.length

    let totalPrice = 0
    cart.map(x => totalPrice += x.price * x.quantity)

    toolbarPrice.innerHTML = `Price: ${totalPrice.toFixed(2)} $`

    modalFooter.innerHTML = 
    `
    
    <h3>Total: ${cart.length}</h3>
    <h3>Price: ${totalPrice.toFixed(2)} $</h3
    
    `
}


function removeFromCart(e) {
    const {id} = e.target
    cart = cart.filter(x => x.id !== Number(id))
    shoppingCart()
    updateToolbar()
}

// FIND PRODUCT, PUSH TO CART
function addToCart(e) {
    const id = e.target.id
    const current = products.find(x => x.id === Number(id))

    const inCart = cart.find(x => x.id === Number(id))

    if(inCart){
        const productIndex = cart.findIndex(x => x.id === Number(id))
        cart[productIndex].quantity++
    } else {
        current.quantity = 1
        cart.push(current)
    }

    updateToolbar()
    shoppingCart()
}

// SHOW CARDS, ADD BUTTONS CLICK EVENTS
function appendProducts(arr) {
    console.log(arr)

    arr.map(x => {
        container.innerHTML += 
        `
        <div class="card">
            <img src="${x.image}" alt="">
            <div class="title">${x.title}</div>
            <div>Price: ${x.price} $</div>
            <div>${x.category}</div>
            <button id="${x.id}" class="addCart">Add to Cart</button>
        </div>
        `
    })

    const buttons = document.querySelectorAll(".addCart")
    buttons.forEach(x => x.onclick = addToCart)   
}

// GET PRODUCTS FROM API
(async () => {
    const data = await fetch("https://fakestoreapi.com/products")
    const res = await data.json()
    products = res
    appendProducts(res)
})()


// SHOPPING CART LOGIC
const modal = document.getElementById("myModal");

const btn = document.getElementById("cartBtn")
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
modal.style.display = "block";
}

span.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}
