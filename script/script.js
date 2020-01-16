document.addEventListener("DOMContentLoaded", function() {
  const search = document.querySelector(".search"),
    cartBtn = document.getElementById("cart"),
    cart = document.querySelector(".cart"),
    wishlistBtn = document.getElementById("wishlist"),
    goodsWrapper = document.querySelector(".goods-wrapper");

  const createCartGoods = (id, title, price, img) => {
    const cart = document.createElement("div");
    cart.className = "card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3";
    cart.innerHTML = `<div class="card">
                        <div class="card-img-wrapper">
                            <img class="card-img-top" src="img/temp/${img}" alt="" />
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
  goodsWrapper.appendChild(createCartGoods(1, "Дартс", 1200, "Archer.jpg"));
  goodsWrapper.appendChild(createCartGoods(2));
  goodsWrapper.appendChild(createCartGoods(3));

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

  const openCart = () => {
    cart.style.display = "flex";
  };

  cartBtn.addEventListener("click", openCart);
  cart.addEventListener("click", closeCart);
  document.addEventListener("keydown", closeCartEsc);
});
