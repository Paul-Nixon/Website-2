if (document.readyState === "loading")
{
    document.addEventListener("DOMContentLoaded", ready);
}
else
{
    ready();
}


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

function removeCartItem(event)
{

}

function quantityChanged(event)
{

}

function addToCartClicked(event)
{

}

function purchaseClicked(event)
{

}

function updateCartTotal()
{

}

function addItemToCart(name, price)
{
    
}