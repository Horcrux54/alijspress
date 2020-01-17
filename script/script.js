document.addEventListener("DOMContentLoaded", function() {
  const search = document.querySelector(".search"),
    cartBtn = document.getElementById("cart"),
    cart = document.querySelector(".cart"),
    wishlistBtn = document.getElementById("wishlist"),
    goodsWrapper = document.querySelector(".goods-wrapper"),
    category = document.querySelector(".category");

  const createCartGoods = (id, title, price, img) => {
    const cart = document.createElement("div");
    cart.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3";
    cart.innerHTML = `<div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="${img}" alt="" />
                            <button class="card-add-wishlist" dara-goods-id="${id}"></button>
                        </div>
                        <div class="card-body justify-content-between">
                            <a href="#" class="card-title">${title}</a>
                            <div class="card-price">${price}</div>
                                <div>
                                    <button class="card-add-cart" dara-goods-id="${id}">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>`;

    return cart;
  };

  const renderCart = items => {
    goodsWrapper.textContent = "";
    items.forEach(({ id, title, price, imgMin }) => {
      goodsWrapper.appendChild(createCartGoods(id, title, price, imgMin));
    });
  };

  const closeCartEsc = event => {
    if (event.code == "Escape") {
      cart.style.display = "";
    }
  };

  const closeCart = event => {
    const target = event.target;
    if (target === cart || target.classList.contains("cart-close")) {
      cart.style.display = "";
    }
  };

  const openCart = event => {
    event.preventDefault();
    cart.style.display = "flex";
  };

  const getGoods = (handler, filter) => {
    fetch("db/db.json")
      .then(response => response.json())
      .then(filter)
      .then(handler);
  };

  const randomSort = item => item.sort(() => Math.random() - 0.5);

  const choiceCategory = event => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains("category-item")) {
      const category = target.dataset.category;
      getGoods(renderCart, goods =>
        goods.filter(item => item.category.includes(category))
      );
    }
  };

  cartBtn.addEventListener("click", openCart);
  cart.addEventListener("click", closeCart);
  document.addEventListener("keydown", closeCartEsc);
  category.addEventListener("click", choiceCategory);

  getGoods(renderCart, randomSort);
});
