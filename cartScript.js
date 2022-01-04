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
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}
function cartNumbers(product) {
  let tagItems = localStorage.getItem("productTag");
  tagItems = JSON.parse(tagItems);
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    let check = product.tag;
    let checkWith = JSON.parse(localStorage.getItem("productTag"));
    let result = checkWith.indexOf(check) > -1;
    if (result === true) {
      alert("this item is already added check in cart");
    } else {
      localStorage.setItem("cartNumbers", productNumbers + 1);
      document.querySelector(".cart span").textContent = productNumbers + 1;
      tagItems = [...tagItems, product.tag];
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
    document.querySelector(".cart span").textContent = 1;
    setItems(product);
    alert(
      "1 of this item is added to cart...if you want increase quantity go to cart page"
    );
  }
}
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
var k = 0;
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
    countOfItemsInCart = new Array(checkSize);
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
                  <a href="#">see more like this</a>
                </div> 
            </div>
            <div class="col">
             <h5 class="price">${item.price}</h5>
            </div>
            </div>`;
      tag[checkSize] = item.tag;
      total += item.inCart * item.price;
      countOfItemsInCart[checkSize] = item.inCart;
      checkSize++;
    });
    let decreaseNode = document.querySelectorAll(".dBtn");
    let increaseNode = document.querySelectorAll(".iBtn");
    let valueDNode = document.querySelectorAll(".value");
    let priceChangeNode = document.querySelectorAll(".price");
    var priceChange = Array.from(priceChangeNode);
    var decrease = Array.from(decreaseNode);
    var increase = Array.from(increaseNode);
    var valueD = Array.from(valueDNode);
    var totalOfPriceArray = new Array(decrease.length);
    var totalInCart = 0; // variable --> total incart value
    var totalCountOfAmount = 0; //total price of items
    var num = new Array(decrease.length);
    console.log(priceChange[0]);
    function checkEntire() {
      num = new Array(decrease.length); // array for item values
      for (let k = 0; k < decrease.length; k++) {
        num[k] = valueD[k].innerHTML;
        num[k] = parseInt(num[k]);
      }
    }
    checkEntire();
    function calculateInCart() {
      totalInCart = 0;
      for (let i = 0; i < num.length; i++) {
        totalInCart += num[i];
      }
    }
    calculateInCart();

    function checkingTotalAmount() {
      for (let i = 0; i < decrease.length; i++) {
        let elementName = tag[i];
        let checkingForTag = localStorage.getItem("productsInCart");
        checkingForTag = JSON.parse(checkingForTag);
        let priceOfItem = checkingForTag[elementName].price;
        priceOfItem = JSON.parse(priceOfItem);
        totalOfPriceArray[i] = priceOfItem;
      }
    }
    checkingTotalAmount();
    function calculate() {
      totalCountOfAmount = 0;
      for (let i = 0; i < decrease.length; i++) {
        totalCountOfAmount += totalOfPriceArray[i];
      }
    }
    calculate();
    function calculateTotalPrice() {
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
    function whenChange() {
      checkEntire();
      var totalOfPrice;
      for (let j = 0; j < decrease.length; j++) {
        decrease[j].onclick = function decreaseValue() {
          let elementName = tag[j];
          let checkingForTag = localStorage.getItem("productsInCart");
          checkingForTag = JSON.parse(checkingForTag);
          let cartCount = checkingForTag[elementName].inCart;
          if (cartCount > 0) {
            console.log("decrease" + j);
            let numD = num[j];
            numD = numD - 1;
            valueD[j].innerHTML = numD;
            num[j] = numD;
            if (numD < 1) {
              num[j] = 1;
              valueD[j].innerHTML = num[j];
            }
            let elementName = tag[j];
            let checkingForTag = localStorage.getItem("productsInCart");
            checkingForTag = JSON.parse(checkingForTag);
            checkingForTag[elementName].inCart = num[j];
            let priceOfItem = checkingForTag[elementName].price;
            priceOfItem = JSON.parse(priceOfItem);
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );
            totalOfPrice = num[j] * priceOfItem;
            totalOfPriceArray[j] = totalOfPrice;
            console.log("this is num[j]", num[j]);
            calculate();
            checkingForTag[elementName].totalPrice = totalOfPriceArray[j];
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );
            priceChange[j].innerHTML = checkingForTag[elementName].totalPrice;
            calculateTotalPrice();
            document.getElementsByClassName("total")[0].innerHTML =
              totalCountOfAmount;
            let checkingFortotalCost = localStorage.getItem("totalCost");
            checkingFortotalCost = JSON.parse(checkingFortotalCost);
            checkingFortotalCost = totalCountOfAmount;
            localStorage.setItem(
              "totalCost",
              JSON.stringify(checkingFortotalCost)
            );

            let checkingForCartNumbers = localStorage.getItem("cartNumbers");
            checkingForCartNumbers = JSON.parse(checkingForCartNumbers);
            calculateInCart();
            checkingForCartNumbers = totalInCart;
            localStorage.setItem(
              "cartNumbers",
              JSON.stringify(checkingForCartNumbers)
            );
            document.querySelector(".cart span").textContent = totalInCart;
          } else {
            alert("this item has been removed");
          }
        };
      }

      for (let j = 0; j < increase.length; j++) {
        increase[j].onclick = function increaseValue() {
          let elementName = tag[j];
          let checkingForTag = localStorage.getItem("productsInCart");
          checkingForTag = JSON.parse(checkingForTag);
          let cartCount = checkingForTag[elementName].inCart;
          if (cartCount > 0) {
            console.log("increase" + j);
            let numI = num[j];
            numI = numI + 1;
            valueD[j].innerHTML = numI;
            num[j] = numI;
            if (numI < 1) {
              num[j] = 1;
              valueD[j].innerHTML = num[j];
            }
            let elementName = tag[j];
            let checkingForTag = localStorage.getItem("productsInCart");
            checkingForTag = JSON.parse(checkingForTag);
            checkingForTag[elementName].inCart = num[j];
            let priceOfItem = checkingForTag[elementName].price;
            priceOfItem = JSON.parse(priceOfItem);
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );
            totalOfPrice = num[j] * priceOfItem;
            totalOfPriceArray[j] = totalOfPrice;
            calculate();
            checkingForTag[elementName].totalPrice = totalOfPrice;
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );
            priceChange[j].innerHTML = checkingForTag[elementName].totalPrice;
            calculateTotalPrice();
            document.getElementsByClassName("total")[0].innerHTML =
              totalCountOfAmount;
            let checkingFortotalCost = localStorage.getItem("totalCost");
            checkingFortotalCost = JSON.parse(checkingFortotalCost);
            checkingFortotalCost = totalCountOfAmount;
            localStorage.setItem(
              "totalCost",
              JSON.stringify(checkingFortotalCost)
            );
            let checkingForCartNumbers = localStorage.getItem("cartNumbers");
            checkingForCartNumbers = JSON.parse(checkingForCartNumbers);
            calculateInCart();
            checkingForCartNumbers = totalInCart;
            localStorage.setItem(
              "cartNumbers",
              JSON.stringify(checkingForCartNumbers)
            );
            document.querySelector(".cart span").textContent = totalInCart;
          } else {
            alert("this item has been removed");
          }
        };
      }
    }

    whenChange();
    let f = 1;
    function onRemove() {
      let removeButtonNode = document.querySelectorAll(".remove");
      let removeButton = Array.from(removeButtonNode);

      for (let i = 0; i < decrease.length; i++) {
        removeButton[i].onclick = function removeItem() {
          for (let j = i; j < i + 1; j++) {
            var price = document.getElementsByClassName("price")[0].innerText;
            price = parseInt(price);

            removeButton[i].parentElement.parentElement.parentElement.remove();

            let checkingForCartNumbers = localStorage.getItem("cartNumbers");
            checkingForCartNumbers = JSON.parse(checkingForCartNumbers);
            checkingForCartNumbers = checkingForCartNumbers - num[i];
            localStorage.setItem(
              "cartNumbers",
              JSON.stringify(checkingForCartNumbers)
            );
            let displayCount = document.querySelector(".cart span").textContent;
            document.querySelector(".cart span").textContent =
              displayCount - num[i];
            let elementName = tag[i];
            let checkingForTag = JSON.parse(
              localStorage.getItem("productsInCart")
            );
            let priceOfItem = checkingForTag[elementName].price;

            priceOfItem = parseInt(priceOfItem);
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );
            removeButton.splice(i, 1);
            decrease.splice(i, 1);
            increase.splice(i, 1);
            valueD.splice(i, 1);
            tag.splice(i, 1);
            priceChange.splice(i, 1);
            var totalNum =
              document.getElementsByClassName("total")[0].innerText;
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
            checkingForTag[elementName].inCart = 0;
            priceOfItem = parseInt(priceOfItem);
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );

            totalOfPriceArray.splice = (i, 1);
            num.splice = (i, 1);
            console.log("thsi is F ", f);
            delete checkingForTag[elementName];
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(checkingForTag)
            );
            let productTag = JSON.parse(localStorage.getItem("productTag"));
            productTag.splice(j, 1);
            localStorage.setItem("productTag", JSON.stringify(productTag));

            checkEntire();
            calculateInCart();
            checkingTotalAmount();
            calculate();

            whenChange();
            onRemove();

            let displayCountOfCart =
              document.querySelector(".cart span").textContent;
            if (displayCountOfCart <= 0) {
              clearCart();
            }

            f++;
          }
        };
      }
    }
    onRemove();

    // console.log(clearButton);
    function clearCart() {
      document.getElementsByClassName("products")[0].innerText =
        "no items in your cart";
      document.getElementsByClassName("total")[0].innerText = " ";
      document.getElementsByClassName("showingPrice")[0].innerText = " ";
      console.log("the end");
      localStorage.clear();
    }

    Object.values(cartItems).map((item) => {
      totalPrice.innerHTML = `
 
    <table>
    <tr>
    <td><h5 class="showingPrice">TotalPrice: </h5> </td>
    <td><h5 class="total">${total}</h5></td>
    </tr>
    </table>
    <div><button class="clearButton btn btn-primary" >Clear Cart</button></div>`;
    });
    let clearButton = document.querySelectorAll(".clearButton")[0];
    clearButton.addEventListener("click", () => {
      localStorage.clear();
      document.getElementsByClassName("products")[0].innerText =
        "no items in your cart";
      document.getElementsByClassName("total")[0].innerText = " ";
      document.getElementsByClassName("showingPrice")[0].innerText = " ";
      document.querySelector(".cart span").textContent = 0;
      console.log("the end");
      clearButton.remove();
    });
  }
}
onLoadCartNumbers();
displayCart();

console.log("last");
// if (performance.navigation.type === 1) {
//   localStorage.clear();
// }
