import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunc.js";

let allProducts = null;
let search = "";
let category = "all";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const serachButton = document.querySelector("button");
const inputBox = document.querySelector("input");
const listItems = document.querySelectorAll("li");

const renderProductsroducts = (product) => {
  mainContent.innerHTML = "";
  product.forEach((product) => {
    mainContent.innerHTML += `
    <div>
      <img src="${product.image}" alt="${product.title}" />
      <h4>${shortenText(product.title)}</h4>
      <div id="price">
      <p>$ ${product.price}</p>
      <button>
      Buy
      <i class="fa-solid fa-cart-shopping"></i>
      </button>
      </div>
      <div id="rate">
      <i class="fa-solid fa-star"></i>
      <span>${product.rating.rate}</span>
      </div>
      <div id="count">
      <i class="fa-solid fa-user"></i>
      <span>${product.rating.count}</span>
      </div>
    </div>
    `;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  renderProductsroducts(allProducts);
};

const filterProducs = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });
  renderProductsroducts(filteredProducts);
};

const searchHandler = () => {
  search = inputBox.value.trim().toLowerCase();
  filterProducs();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();
  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });

  filterProducs();
};

document.addEventListener("DOMContentLoaded", init);
serachButton.addEventListener("click", searchHandler);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
