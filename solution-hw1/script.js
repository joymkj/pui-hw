class Roll {
  constructor(type, price, glazing, packSize) {
    this.type = type;
    this.price = price;
    this.glazing = glazing;
    this.packSize = packSize;
  }
}

let cart = [];
var addToCartButtons = document.getElementsByClassName('add-to-cart');

for (var i = 0; i < addToCartButtons.length; i++) {
  var btn = addToCartButtons[i];
  btn.addEventListener('click', addToCart);
}

function addToCart(event) {
  var btn = event.target;
  var product = btn.closest('.product');
  var type = product.getElementsByClassName('product-name')[0].innerText;
  var price = product.getElementsByClassName('price')[0].innerText.replace('$ ', '');
  var glaze_ref = product.getElementsByClassName('glaze_menu')[0];
  var glazing = glaze_ref.options[glaze_ref.selectedIndex].text;
  var packSize = product.querySelector('input[name="pack_size"]:checked').value;
  const roll = new Roll(type, price, glazing, packSize);
  cart.push(roll);

  console.log(cart);
}
