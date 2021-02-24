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
   Precondition: There's at least one cart item rendered in the webpage. 
   Postcondition: The cart row in which the clicked "remove" button's located is removed, and
   the cart's total is updated.
*/
function removeCartItem(event)
{
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove(); // Removes the cart row the button's located in
    updateCartTotal();
}

/* Function quantityChanged either sets a cart item's quantity to 1 when its value is
   NaN or <= 0 or calls updateCartTotal() to update the cart's total.
   Precondition: There's at least one cart item rendered in the webpage.
   Postcondition: The targeted quantity input's value is set to 1 if its value is
   NaN or <=0, or updateCartTotal() is called to update the cart's total.
*/
function quantityChanged(event)
{
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0)
        input.value = 1;
    else
        updateCartTotal();
}

/* Function addToCartClicked() gets the name and price of the store item related to the
   "ADD TO CART" button that's clicked and passes them to addItemToCart(title, price).
   Precondition: There's at least one store item rendered in the webpage.
   Postcondition: The name and price of the store item related to the "ADD TO CART" button 
   that's clicked is passed to addItemToCart(title, price) and rendered in the cart.
*/
function addToCartClicked(event)
{
    // Store the button that's clicked in a variable.
    let buttonClicked = event.target;

    // Store the store item related to the clicked button in a variable.
    let storeItem = buttonClicked.parentElement;

    // Get the respective text of the store item's title and price.
    let title = storeItem.querySelector(".store-item-title").innerText;
    let price = storeItem.querySelector(".store-item-price").innerText;

    // Pass the store item's title and price to addItemToCart(title, price).
    addItemToCart(title, price);
}

/* Function purchaseClicked() renders an alert thanking the customer for making a purchase,
   removes all cart items from the cart, and calls updateCartTotal().
   Precondition: There's at least one store item rendered in the webpage.
   Postcondition: An alert renders thanking the customer for making a purchase, all
   cart items are removed from the cart, and updateCartTotal() is called.
*/
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

/* Function updateCartTotal() updates the cart's total.
   Precondition: There's at least one store item rendered in the webpage.
   Postcondition:
   removeCartItem() -> If called by removeCartItem(), the cart's total will equal the
   aggregate of the remaining cart items, if any, or $0.
   quantityChanged() -> If called by quantityChanged(), the cart's total will either
   increase or decrease based on the targeted cart item's specified quantity.
   purchaseClicked() -> If called by purchaseClicked(), the cart's total will be set to
   $0 since all its items were removed.
   addItemToCart() -> if called by addItemToCart(), the cart's total will increase by the
   new cart item's default value.
*/
function updateCartTotal()
{
    // Create an accumulator and store the cart's items and rows in respective variables.
    let cartItemContainer = document.querySelector(".cart-items");
    let cartRows = cartItemContainer.querySelectorAll(".cart-row");
    let total = 0; // The cart's total price

    /* Multiply each cart item's respective price by its quantity and add the
       result to the accumulator.*/  
    cartRows.forEach((cartRow) => {
        let priceElement = cartRow.querySelector(".cart-price");
        let quantityElement = cartRow.querySelector(".cart-quantity-input");
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    });

    // Round the cart's total to the nearest two decimal places and render it on the webpage.
    total = Math.round(total * 100) / 100; // Rounds the total to the nearest two decimal places
    document.querySelector(".cart-total-price").innerText = "$" + total;
}

/* Function addItemToCart(title, price) creates a new cart row and renders the new cart item's
   name and price, quantity input, and remove button.
   Precondition: There's at least one store item rendered in the webpage.
   Postcondition: If the selected store item's already in the cart, then an alert'll
   render notifying the shopper as such. Else, a new cart row w/the added cart item's
   name, price and quantity input & a remove button will be rendered into the webpage.
*/
function addItemToCart(title, price)
{
    // Create a new cart row and store the cart items and their names in respective variables.
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.querySelector(".cart-items");
    let cartItemNames = cartItems.querySelectorAll(".cart-item-name");

    /* Check if the cart item's already in the cart. If so, render an alert
       notifying the shopper as such and stop the function. Otherwise, let the function
       resume.
    */
    for (let i = 0; i < cartItemNames.length; i++)
    {
        if (cartItemNames[i].innerText === title)
        {
            alert("This item is already added to the cart.");
            return;
        }
    }

    /* Render the new cart row, add event listeners to its quantity input and remove button,
       and call updateCartTotal().
    */
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