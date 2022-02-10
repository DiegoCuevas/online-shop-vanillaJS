function getData() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => data.forEach(element => createProduct(element)));
}

function searchInput(name) {
  fetch(`http://localhost:3000/search?name=${name}`)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("products").textContent = "";
    data.forEach(element => createProduct(element));
  })
}

function createProduct(product) {
  let productDiv = document.createElement("div");
  productDiv.classList.add("product", "bg-white", "rounded-xl", "shadow-xl", "p-3", "h-96");
  productDiv.setAttribute("data-id", product.id);
  productDiv.innerHTML = `
  <div class="flex flex-col justify-between h-full">
    <div class="">
      <div class="flex h-72 items-center">
        <img src="${product.url_image}" alt="${product.name}">
      </div>
      <div class="text-center">${product.name}</div>
    </div>
    <div class="flex justify-between px-4 border-t py-2">
      <div class="w-2/3 text-center py-2">$${product.price || 0}</div>
      <button class="rounded px-3 flex items-center justify-center bg-gray-600 rounded-full"><i class="fa fa-cart-plus text-white min-w-0"></i></button>
    </div>
  </div>
  `;
  document.querySelector("#products").appendChild(productDiv);
}

getData();