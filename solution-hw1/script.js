class Roll {
  constructor(type, price, glazing, packSize) {
    this.type = type;
    this.price = price;
    this.glazing = glazing;
    this.packSize = packSize;
  }
}

let cart = [];
let total_price = 0.0;
let number_of_items = 0;
var timeout;
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
  total_price += parseFloat(price);
  number_of_items++;
  updateCart();
  cart_popup(type, glazing, packSize, parseFloat(price));
}

function updateCart() {
  var cartInfo = document.querySelector('.cart-info');
  cartInfo.innerHTML = number_of_items + ' items<br />Total: $ ' + total_price.toFixed(2);
}

function cart_popup(type, glazing, packSize, price) {
  hideCartPopup();
  var popup = document.querySelector('.cart-popup');
  popup.style.visibility = 'visible';
  clearTimeout(timeout);
  popup.innerHTML += '<p><b>' + type + '</b></p>';
  popup.innerHTML += '<p>' + glazing + ' glazing</p>';
  popup.innerHTML += '<p>Pack of ' + packSize + '</p>';
  popup.innerHTML += '<p>Price: $ ' + price.toFixed(2) + '</p>';
  timeout = setTimeout(hideCartPopup, 3000);
}

function hideCartPopup() {
  var popup = document.querySelector('.cart-popup');
  popup.style.visibility = 'hidden';
  popup.innerHTML = '<p>Added to cart: <br /><br /></p>';
}

function glazingChange(element) {
  const glazing_price = parseFloat(element.value);
  var product = element.closest('.product');
  var packSize = product.querySelector('input[name="pack_size"]:checked').value;
  var type = product.getElementsByClassName('product-name')[0].innerText;
  var newPrice = calculatePrice(type, packSize, glazing_price);
  console.log('newprice ' + newPrice);
  product.getElementsByClassName('price')[0].innerText = '$ ' + newPrice;
}

function updatePackSize(element) {
  const packSize = element.value;
  var product = element.closest('.product');
  var type = product.getElementsByClassName('product-name')[0].innerText;
  var glaze_ref = product.getElementsByClassName('glaze_menu')[0];
  var glazing_price = parseFloat(glaze_ref.options[glaze_ref.selectedIndex].value);
  console.log('Pack size: ' + packSize + 'type: ' + type + 'glazing price: ' + glazing_price);
  var newPrice = calculatePrice(type, packSize, glazing_price);
  console.log('newprice ' + newPrice);
  product.getElementsByClassName('price')[0].innerText = '$ ' + newPrice;
}

function calculatePrice(type, packSize, glazing_price) {
  var basePrice = 0;
  switch (type) {
    case 'Original cinnamon roll':
      basePrice = 2.49;
      break;
    case 'Apple cinnamon roll':
      basePrice = 3.49;
      break;
    case 'Raisin cinnamon roll':
      basePrice = 2.99;
      break;
    case 'Walnut cinnamon roll':
      basePrice = 3.49;
      break;
    case 'Double-chocolate cinnamon roll':
      basePrice = 3.99;
      break;
    case 'Strawberry cinnamon roll':
      basePrice = 3.99;
      break;
    default:
      console.log('Error in calculating price');
  }
  console.log('Baseprice ' + basePrice);
  console.log('glazing price ' + glazing_price);
  console.log('pack size ' + packSize);
  var newPrice = parseFloat((basePrice + glazing_price) * packSize).toFixed(2);
  console.log('New price' + newPrice);
  return newPrice;
}
