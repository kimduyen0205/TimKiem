function Start() {
  getData(Display);
}
Start();
function getData(callback) {
  // gọi hàm Display
  fetch("http://localhost:3000/products")
    .then(function (response) {
      return response.json();
    })
    .then(callback); //gọi hàm Display
}
function Display(products) {
  let div = document.getElementById("list-products");
  //   console.log(products);
  localStorage.setItem("test", JSON.stringify(products));
  let rs = products.map(function (product) {
    return `
      <div class="box-product">
        <img src=${product.image.src} alt=${product.title}/>
        <h4>${product.title}</h4>
      </div>
    `;
  });
  div.innerHTML = rs.join("");
}
function SearchProduct() {
  let arrproduct = localStorage.getItem("test")
    ? JSON.parse(localStorage.getItem("test"))
    : [];
  // console.log(arrproduct);
  let inputSearch = document.getElementById("myInput").value;
  let newarr = [];
  for (let item of arrproduct) {
    if (item.title.toLowerCase().includes(inputSearch.toLowerCase())) {
      newarr.push(item);
    }
  }
  if (newarr.length !== 0) {
    let kq = ``;
    newarr.map(function (item) {
      item.variants.map(function (quantity) {
        let sl = ``;
        if (
          quantity.inventory_quantity !== 0 &&
          quantity.inventory_quantity !== -1
        ) {
          sl += `Số lượng hàng:${quantity.inventory_quantity}`;
        } else if (
          quantity.inventory_quantity === 0 ||
          quantity.inventory_quantity === -1
        ) {
          sl += `Hết hàng`;
        }
        kq += 
        `<div class="box-product">
          <img src=${item.image.src} alt=${item.title}/>
          <h4>${item.title}</h4>
          <p>${sl}</p>
          <p class="line">Giá gốc:${quantity.compare_at_price}đ</p>
          <p>Khuyến mãi:${quantity.price}đ</p>
        </div>`;
      });
    });
    document.getElementById("search-product").innerHTML = kq;
  } else {
    let khongtimthay = ``;
    khongtimthay += `<div class="page-not-found"><img src="https://www.interno-eg.com/resources/assets/front/images/no-product-found.png"/></div>`;
    document.getElementById("search-product").innerHTML = khongtimthay;
  }
}
