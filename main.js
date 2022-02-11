function getData() {
  fetch("https://8fb3c4dc9990.up.railway.app/products")
    .then((response) => response.json())
    .then((data) => data.forEach((element) => createProduct(element)));
}

function getCategories() {
  fetch("https://8fb3c4dc9990.up.railway.app/categories")
    .then((response) => response.json())
    .then((data) => data.forEach((element) => createCategory(element)));
}
// add product to local storage and render it
function addProductToCart(productId) {
  fetch(`https://8fb3c4dc9990.up.railway.app/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      let product = {
        id: data.id,
        name: data.name,
        price: data.price,
        count: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart === null) {
        cart = [];
      }
      if (cart.find((element) => element.id === product.id)) {
        cart.find((element) => element.id === product.id).count++;
      } else {
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Producto agregado al carrito!");
      renderCart();
    });
}

function renderCart(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  if(cart === null){
    cart = [];
  }
  document.querySelector("#cart").innerHTML = "";
  cart.forEach((element) => createCartProduct(element));
}

function getProducts() {
  let products = JSON.parse(localStorage.getItem("products"));
  if (products === null) {
    products = [];
  }
  return products;
}

function createCartProduct(product) {
  let cart = document.querySelector("#cart");
  let div = document.createElement("div");
  div.classList.add("cart-product");
  div.innerHTML = `
  <div class="flex items-center justify-between h-full">
    <div class="">
      <div class="text-center">${product.name}</div>
    </div>
    <div class="flex w-1/2 justify-between px-4 py-2">
    <div class="w-2/3 text-center py-2">$${product.price || 0}</div>
    <div class="w-1/3 text-center py-2">${product.count}</div>
      <button onclick="removeProduct(${product.id})" 
        class="rounded px-3 flex items-center justify-center bg-gray-600 rounded-full">
        <i class="fa fa-cart-plus text-white min-w-0"></i>
      </button>
    </div>
  </div>
  `;
  cart.appendChild(div);
}

function removeProduct(productId) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach((element, index) => {
    if (element.id === productId) {
      cart.splice(index, 1);
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function createCategory(category) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");
  categoryDiv.innerHTML = `
    <div class="w-full px-4 py-2 ">
      <i class="fa fa-angle-right" aria-hidden="true"></i>
      <button class="text-left hover:underline" onclick="orderByCategories(${category.id})">
        ${category.name}
      </button>
    </div>
  `;
  document.querySelector("#categories").appendChild(categoryDiv);
}
function orderByCategories(categoryId) {
  fetch(`https://8fb3c4dc9990.up.railway.app/order_by_category?category_id=${categoryId}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#products").innerHTML = "";
      data.forEach((element) => createProduct(element));
    });
}

function searchInput(name) {
  fetch(`https://8fb3c4dc9990.up.railway.app/search?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("products").textContent = "";
      data.forEach((element) => createProduct(element));
    });
}

function createProduct(product) {
  let productDiv = document.createElement("div");
  productDiv.classList.add(
    "product",
    "bg-white",
    "rounded-xl",
    "shadow-xl",
    "p-3",
    "h-96"
  );
  productDiv.setAttribute("data-id", product.id);
  productDiv.innerHTML = `
  <div class="flex flex-col justify-between h-full">
    <div class="">
      <div class="flex h-64 items-center justify-center">
        <img class="h-full" src="${product.url_image}" alt="${product.name}">
      </div>
      <div class="text-center">${product.name}</div>
    </div>
    <div class="flex justify-between px-4 border-t py-2">
      <div class="w-2/3 text-center py-2">$${product.price || 0}</div>
      <button onclick="addProductToCart(${product.id})" class="rounded px-3 flex items-center justify-center bg-gray-600 rounded-full"><i class="fa fa-cart-plus text-white min-w-0"></i></button>
    </div>
  </div>
  `;
  document.querySelector("#products").appendChild(productDiv);
}

function openModal() {
  console.log(localStorage.getItem("cart"));
  if(localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length > 0){
    document.getElementById("myModal").style.display = "block";
  }else{
    alert("Agregue productos al carrito");
  }
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

window.onclick = function (event) {
  let modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

getData();
getCategories();
renderCart();