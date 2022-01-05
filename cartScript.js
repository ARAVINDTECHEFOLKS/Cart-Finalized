console.log("running");
let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Lenovo Tab M10 HD 2nd Gen",
    tag: "Lenovo Tab M10",
    price: 10,
    inCart: 0,
    totalPrice: 10,
  },
  {
    name: "Lenovo Tab M10 FHD Plus Tablet",
    tag: "Lenovo Tab M10 FHD",
    price: 20,
    inCart: 0,
    totalPrice: 20,
  },
  {
    name: "Lenovo Yoga Smart Tablet",
    tag: "Lenovo Yoga Smart Tablet",
    price: 30,
    inCart: 0,
    totalPrice: 30,
  },
  {
    name: "Lenovo Tab M8 HD 2nd Gen",
    tag: "Lenovo Tab M8",
    price: 40,
    inCart: 0,
    totalPrice: 40,
  },
  {
    name: "Lenovo Tab M7 3rd Gen",
    tag: "Lenovo Tab M7",
    price: 50,
    inCart: 0,
    totalPrice: 50,
  },
  {
    name: "Lenovo Tab M10 HD Tablet",
    tag: "Lenovo Tab M10 HD",
    price: 60,
    inCart: 0,
    totalPrice: 60,
  },
];
var ProductId = new Array(products.length);
for (let i = 0; i < products.length; i++) {
  ProductId[i] = products[i].tag;
}
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener(
    "click",
    () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    },
    { once: true }
  );
}
//this function will collect the count of cart before you run code
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}
// this function will help to add items into localstorage as well as changes cart count
function cartNumbers(product) {
  let tagItems = localStorage.getItem("productTag");
  tagItems = JSON.parse(tagItems);
  if (tagItems) {
    let check = product.tag;
    let checkWith = JSON.parse(localStorage.getItem("productTag"));
    let result = checkWith.indexOf(check) > -1;
    if (result === true) {
      alert("this item is already added check in cart");
    } else {
      tagItems = [...tagItems, product.tag];
      localStorage.getItem("cartNumbers");
      localStorage.setItem("cartNumbers", tagItems.length);
      document.querySelector(".cart span").textContent = tagItems.length;
      localStorage.setItem("productTag", JSON.stringify(tagItems));
      setItems(product);
      alert(
        "1 of this  item is added to cart...if you want increase quantity go to cart page"
      );
    }
  } else {
    tagItems = [product.tag];
    localStorage.setItem("productTag", JSON.stringify(tagItems));
    localStorage.setItem("cartNumbers", 1);
    console.log(tagItems.length);
    document.querySelector(".cart span").textContent = tagItems.length;
    setItems(product);
    alert(
      "1 of this item is added to cart...if you want increase quantity go to cart page"
    );
  }
}
//this function get called in above function which is usefull to set items in local storage
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
// this function will update totalcost in localstorage
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    let totalCostofItem = product.inCart * product.price;
    localStorage.setItem("totalCost", cartCost + totalCostofItem);
  } else {
    let totalCostofItem = product.inCart * product.price;
    localStorage.setItem("totalCost", totalCostofItem);
  }
}
//cart page will get updated with this function
function displayCart() {
  var total = 0;
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let totalPrice = document.querySelector(".total-price");
  let productsContainer = document.querySelector(".products");
  if (cartItems && productsContainer) {
    productsContainer.innerHTML = ``;
    totalPrice.innerHTML += ``;
    var checkSize = 0;
    var tag = [];
    Object.values(cartItems).map((item) => {
      productsContainer.innerHTML += `
      <div class="row">
      <div class="image col image_col">
              <img src="./assets/${item.tag}.jpg">
            </div>
            <div class="text col-6">
            <h5 class="itemName">${item.name}</h5>
            <div class="table">
                      <button class="dBtn"><</button></i><span id="checkingValue"><a class="value" >${item.inCart}</a></span><button class="iBtn">></button>
                    <a class="remove" href="#">Delete</a> <a> | </a>
                  <a href="index.html">see more like this</a>
                </div> 
            </div>
            <div class="col">
             <h5 class="price">${item.price}</h5>
            </div>
            </div>`;
      tag[checkSize] = item.tag;
      total += item.inCart * item.price;
      checkSize++;
    });
    let decreaseNode = document.querySelectorAll(".dBtn");
    let increaseNode = document.querySelectorAll(".iBtn");
    let valueNode = document.querySelectorAll(".value");
    let priceChangeNode = document.querySelectorAll(".price");
    var priceChange = Array.from(priceChangeNode);
    var decrease = Array.from(decreaseNode);
    var increase = Array.from(increaseNode);
    var value = Array.from(valueNode);
    var totalOfPriceArray = new Array(decrease.length);
    var totalCountOfAmount = 0; //total price of items
    var num = new Array(decrease.length);
    console.log(priceChange[0]);
    function checkEntire() {
      //this function useful to check no.of qty of a product
      num = new Array(decrease.length); // array for item values
      for (let k = 0; k < decrease.length; k++) {
        num[k] = value[k].innerHTML;
        num[k] = parseInt(num[k]);
      }
    }
    checkEntire();
    function checkingTotalAmount() {
      //this function will help to get the price of each item
      for (let i = 0; i < decrease.length; i++) {
        let elementName = tag[i];
        let checkingForTag = localStorage.getItem("productsInCart");
        checkingForTag = JSON.parse(checkingForTag);
        let priceOfItem = checkingForTag[elementName].totalPrice;
        priceOfItem = JSON.parse(priceOfItem);
        totalOfPriceArray[i] = priceOfItem;
      }
    }
    checkingTotalAmount();
    function calculate() {
      //this function will help to return total cost of cart
      totalCountOfAmount = 0;
      for (let i = 0; i < decrease.length; i++) {
        totalCountOfAmount += totalOfPriceArray[i];
      }
    }
    calculate();
    function calculateTotalPrice() {
      //this function will return totalprice of individual item and update at price div
      for (let j = 0; j < decrease.length; j++) {
        let elementName = tag[j];
        let checkingForTag = localStorage.getItem("productsInCart");
        checkingForTag = JSON.parse(checkingForTag);
        let priceOfItem = checkingForTag[elementName].totalPrice;
        priceOfItem = JSON.parse(priceOfItem);
        priceChange[j].innerHTML = checkingForTag[elementName].totalPrice;
      }
    }
    calculateTotalPrice();
    function afterQtyChange() {
      let elementName = tag[index];
      console.log(index);
      let checkingForTag = localStorage.getItem("productsInCart");
      checkingForTag = JSON.parse(checkingForTag);
      checkingForTag[elementName].inCart = count;
      let priceOfItem = checkingForTag[elementName].price;
      priceOfItem = JSON.parse(priceOfItem);
      let totalOfPrice = count * priceOfItem;
      totalOfPriceArray[index] = totalOfPrice;
      calculate();
      checkingForTag[elementName].totalPrice = totalOfPrice;
      localStorage.setItem("productsInCart", JSON.stringify(checkingForTag));
      priceChange[index].innerHTML = checkingForTag[elementName].totalPrice;
      calculateTotalPrice();
      document.getElementsByClassName("total")[0].innerHTML =
        totalCountOfAmount;
      let checkingFortotalCost = localStorage.getItem("totalCost");
      checkingFortotalCost = JSON.parse(checkingFortotalCost);
      checkingFortotalCost = totalCountOfAmount;
      localStorage.setItem("totalCost", JSON.stringify(checkingFortotalCost));
    }
    //this function for incrementing and decrementing qty
    var index;
    var count;
    function whenChange() {
      checkEntire();
      //var totalOfPrice;
      for (let j = 0; j < decrease.length; j++) {
        decrease[j].onclick = function decreaseValue() {
          //used for decreasing qty
          index = j;
          console.log("decrease" + j);
          console.log(index);
          num[j] = num[j] - 1;
          count = num[j];
          value[j].innerHTML = num[j];
          if (num[j] < 1) {
            num[j] = 1;
            value[j].innerHTML = num[j];
          }
          afterQtyChange();
        };
      }
      for (let j = 0; j < increase.length; j++) {
        increase[j].onclick = function increaseValue() {
          //used for increasing qty
          index = j;
          num[j] = num[j] + 1;
          count = num[j];
          value[j].innerHTML = num[j];
          if (num[j] < 1) {
            num[j] = 1;
            value[j].innerHTML = num[j];
          }
          afterQtyChange();
        };
      }
    }
    whenChange();
    function onRemove() {
      // thsi function for delete button
      let removeButtonNode = document.querySelectorAll(".remove");
      let removeButton = Array.from(removeButtonNode);
      for (let i = 0; i < decrease.length; i++) {
        removeButton[i].onclick = function removeItem() {
          removeButton[i].parentElement.parentElement.parentElement.remove();
          let checkingForCartNumbers = JSON.parse(
            localStorage.getItem("cartNumbers")
          );
          checkingForCartNumbers = checkingForCartNumbers - 1;
          localStorage.setItem(
            "cartNumbers",
            JSON.stringify(checkingForCartNumbers)
          );
          let elementName = tag[i];
          let checkingForTag = JSON.parse(
            localStorage.getItem("productsInCart")
          );
          let priceOfItem = checkingForTag[elementName].price;
          priceOfItem = parseInt(priceOfItem);
          removeButton.splice(i, 1);
          decrease.splice(i, 1);
          increase.splice(i, 1);
          value.splice(i, 1);
          tag.splice(i, 1);
          priceChange.splice(i, 1);
          var totalNum = document.getElementsByClassName("total")[0].innerText;
          totalNum = parseInt(totalNum);
          document.getElementsByClassName("total")[0].innerHTML =
            totalNum - num[i] * priceOfItem;
          let checkingFortotalCost = localStorage.getItem("totalCost");
          checkingFortotalCost = JSON.parse(checkingFortotalCost);
          checkingFortotalCost = totalNum - num[i] * priceOfItem;
          localStorage.setItem(
            "totalCost",
            JSON.stringify(checkingFortotalCost)
          );
          totalOfPriceArray.splice = (i, 1);
          num.splice = (i, 1);
          delete checkingForTag[elementName];
          localStorage.setItem(
            "productsInCart",
            JSON.stringify(checkingForTag)
          );
          let productTag = JSON.parse(localStorage.getItem("productTag"));
          productTag.splice(i, 1);
          document.querySelector(".cart span").textContent = productTag.length;
          localStorage.setItem("productTag", JSON.stringify(productTag));
          whenChange();
          onRemove();
          let displayCountOfCart =
            document.querySelector(".cart span").textContent;
          if (displayCountOfCart <= 0) {
            clearCart();
          }
        };
      }
    }
    onRemove();
    // this function clearing cart and local storage when there is no item in the cart
    function clearCart() {
      document.getElementsByClassName("products")[0].innerText =
        "no items in your cart";
      document.getElementsByClassName("total")[0].innerText = " ";
      document.getElementsByClassName("showingPrice")[0].innerText = " ";
      clearButton.remove();
      localStorage.clear();
    }
    totalPrice.innerHTML = `
    <table>
    <tr>
    <td><h5 class="showingPrice">TotalPrice: </h5> </td>
    <td><h5 class="total">${total}</h5></td>
    </tr>
    </table>
    <div><button class="clearButton btn btn-primary" >Clear Cart</button></div>`;
    let clearButton = document.querySelectorAll(".clearButton")[0];
    clearButton.addEventListener("click", () => {
      //this function is for clear cart button
      clearCart();
      document.querySelector(".cart span").textContent = 0;
    });
  }
}
onLoadCartNumbers();
displayCart();
console.log("last");
// if (performance.navigation.type === 1) {
//   localStorage.clear();
// }
