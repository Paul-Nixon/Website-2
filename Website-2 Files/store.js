if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready);
}
else
{
    ready();
}

/* Function ready() links all the webpage's buttons to their respective function when it's 
   fully loaded.
   Precondition: The webpage finished loading.
   Postcondition: All the webpage's buttons are connected to their respective function.
*/
function ready()
{
    let removeCartItemButtons = document.querySelectorAll(".remove-btn");
    removeCartItemButtons.forEach((button) => {button.addEventListener("click", removeCartItem)});
    let quantityInputs = document.querySelectorAll(".cart-quantity-input");
    quantityInputs.forEach((button) => {button.addEventListener("change", quantityChanged)});
    let addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {button.addEventListener("click", addToCartClicked)});
    document.querySelector(".purchase-btn").addEventListener("click", purchaseClicked);
}

/* Function removeCartItem(event) removes the cart row in which the clicked "remove" button's located 
   and calls updateCartTotal() to update the cart's total.
   Precondition: There's at least one cart row rendered in the webpage. 
   Postcondition: The cart row in which the clicked "remove" button's located is removed, and
   the cart's total is updated.
*/
function removeCartItem(event)
{
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event)
{
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0)
        input.value = 1;
    else
        updateCartTotal();
}

function addToCartClicked(event)
{
    let buttonClicked = event.target;
    let shopItem = buttonClicked.parentElement;
    let title = shopItem.querySelector(".store-item-title").innerText;
    let price = shopItem.querySelector(".store-item-price").innerText;
    addItemToCart(title, price);
}

function purchaseClicked(event)
{
    alert("Thank you for your purchase!");
    let cartItems = document.querySelector(".cart-items");
    while (cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function updateCartTotal()
{
    let cartItemContainer = document.querySelector(".cart-items");
    let cartRows = cartItemContainer.querySelectorAll(".cart-row");
    let total = 0; // The cart's total price
    cartRows.forEach((cartRow) => {
        let priceElement = cartRow.querySelector(".cart-price");
        let quantityElement = cartRow.querySelector(".cart-quantity-input");
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    });
    total = Math.round(total * 100) / 100; // Rounds the total to the nearest two decimal places
    document.querySelector(".cart-total-price").innerText = "$" + total;
}

function addItemToCart(title, price)
{
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.querySelector(".cart-items");

    let cartItemNames = cartItems.querySelectorAll(".cart-item-name");
    for (let i = 0; i < cartItemNames.length; i++)
    {
        if (cartItemNames[i].innerText == title)
        {
            alert("This item is already added to the cart.");
            return;
        }
    }

    let cartRowContents = `
        <span class="cart-item-name cart-column">${title}</span>
        <span class="cart-price cart-column">${price}</span>
        
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="remove-btn" type="button">REMOVE</button>
        </div>`

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.querySelector(".remove-btn").addEventListener("click", removeCartItem);
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    updateCartTotal();
}