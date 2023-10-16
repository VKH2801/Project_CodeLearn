$(document).ready(function () {
    let USER = JSON.parse(localStorage.getItem("UserName"));
    if (USER != null) {
        $("#control-link").css("display", "none");
        var dt = $(`
              <span>Welcome ${USER.tenTK}</span>
              <button class="btn-logOut" onclick="logOut()"><i class="fa-solid fa-right-from-bracket"></i></button>
          `);
        $("#control-top").append(dt);
    }
});
/* <--------------> Bật mở Modal <--------------> !!! */
function Close() {
    var elms = document.getElementById("Modal-appear");
    elms.style.display = "none";
}

function Open(id) {
    console.log(id);
    var elms = document.getElementById("Modal-appear");
    $.post(
        "http://localhost:3000/Shopping/DetailSP",
        {
            idSP: id,
        },
        (data, status) => {
            if (data[0].Gioitinh == true) {
                data[0].Gioitinh = "Woman";
                Modal_Detail = `
         <div class="Modal-content">
              <button class="button-icon" onclick="Close()">X</button>
              <div class="Modal-left">
                 <img class="img-main" src="/images/${data[0].HinhSP}" alt="">
                 <ul class="list-img">
                   <li class="img-1 active"><img src="popup-quickview-item-1.jpg" alt=""></li>
                   <li class="img-2"><img src="popup-quickview-item-1.jpg" alt=""></li>
                   <li class="img-3"><img src="popup-quickview-item-1.jpg" alt=""></li>
                 </ul>
              </div>
              <div class="Modal-right">
                <h1>${data[0].TenSP}</h1>
                <span class="Ava">availability: <a href="#">In stock</a></span>
                <span class="priece">${data[0].GiaSP}$</span>
                <ul class="Detail-information">
                  <li>${data[0].XuatSu}</li>
                  <li>${data[0].Gioitinh}</li>
                  <li id="soLuongTon">${data[0].SL}</li>
                </ul>
                <div class="controll-product">
                  <button class="Buy-Amount" onclick="Minus()"><i class="fa-solid fa-minus"></i></button>
                  <input class="input-number" onkeyup="InputText()"  id="input-number" type="text" id="quantity" value="1" name="quantity">
                  <button class="Buy-Amount" onclick="Plus()">+</button>
                  <button class="Add_to_card" onclick="buyNow(${id})">Buy Now</button>
                </div>
              </div>`;
            } else {
                data[0].Gioitinh = "Man";
                Modal_Detail = `
         <div class="Modal-content">
              <button class="button-icon" onclick="Close()">X</button>
              <div class="Modal-left">
                 <img class="img-main" src="/images/${data[0].HinhSP}" alt="">
                 <ul class="list-img">
                   <li class="img-1 active"><img src="popup-quickview-item-1.jpg" alt=""></li>
                   <li class="img-2"><img src="popup-quickview-item-1.jpg" alt=""></li>
                   <li class="img-3"><img src="popup-quickview-item-1.jpg" alt=""></li>
                 </ul>
              </div>
              <div class="Modal-right">
                <h1>${data[0].TenSP}</h1>
                <span class="Ava">availability: <a href="#">In stock</a></span>
                <span class="priece">${data[0].GiaSP}$</span>
                <ul class="Detail-information">
                  <li>${data[0].XuatSu}</li>
                  <li>${data[0].Gioitinh}</li>
                  <li id="soLuongTon">${data[0].SL}</li>
                </ul>
                <div class="controll-product">
                <button class="Buy-Amount" onclick="Minus()"><i class="fa-solid fa-minus"></i></button>
                <input class="input-number" onkeyup="InputText()"  id="input-number" type="text" id="quantity" value="1" name="quantity">
                <button class="Buy-Amount" onclick="Plus()">+</button>
                <button class="Add_to_card" onclick="buyNow(${id})">Buy Now</button>
                </div>
              </div>`;
            }
            $("#Modal-appear").html(Modal_Detail);
        }
    );
    elms.style.display = "block";
}
/* <-----------> Cộng Số lượng <----------> */
function Plus() {
    var amount = document.getElementById("input-number").value;
    var soLuongTon = document.getElementById("soLuongTon").innerText;
    if (amount < 10 && amount < parseInt(soLuongTon)) {
        amount++;
        document.getElementById("input-number").value = amount;
    }
}
/* <-----------> Trừ Số lượng <----------> */
function Minus() {
    var amount = document.getElementById("input-number").value;
    amount--;
    if (amount < 1) {
        amount = 1;
    }
    document.getElementById("input-number").value = amount;
}
/* <-----------> Nhập Số lượng <--------> */
function InputText() {
    var amount = document.getElementById("input-number").value;
    amount = parseInt(amount);
    amount = isNaN(amount) || amount < 0 || amount > 20 ? 1 : amount;
    document.getElementById("input-number").value = amount;
}

function logOut() {
    localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace("/login");
}

function sapXep() {
    let storage = JSON.parse(localStorage.getItem("listItem"));
    storage.sort(function (a, b) {
        return a.idSP - b.idSP;
    });
    localStorage.setItem("listItem", JSON.stringify(storage));
}
function createItem(id, quantity) {
    var newItem = new Object();
    newItem.idSP = id;
    newItem.quantity = quantity;
    return newItem;
}

function addToCart(id) {
    var id = parseInt(id);
    const soLuong = 1;
    var getStorage = localStorage.getItem("listItem");
    storage = JSON.parse(getStorage);
    if (storage == null) {
        storage = [createItem(id, soLuong)];
    } else {
        let newArr = storage.map(function (e) {
            return e.idSP;
        });
        if (newArr.indexOf(id) == -1) {
            storage.push(createItem(id, soLuong));
        }
    }
    localStorage.setItem("listItem", JSON.stringify(storage));
    toast();
    sapXep();
}
function buyNow(id) {
    var id = parseInt(id);
    var soLuong = document.getElementById("input-number").value;
    var getStorage = localStorage.getItem("listItem");
    storage = JSON.parse(getStorage);
    if (storage == null) {
        storage = [createItem(id, soLuong)];
    } else {
        let newArr = storage.map(function (e) {
            return e.idSP;
        });
        if (newArr.indexOf(id) == -1) {
            storage.push(createItem(id, soLuong));
        }
    }
    localStorage.setItem("listItem", JSON.stringify(storage));
    toast();
    sapXep();
}

function toast() {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");
        const autoRemove = setTimeout(() => {
            main.removeChild(toast);
        }, 3000);
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        };
        toast.classList.add("toast", "toast--success");
        toast.style.animation = `ShowToast ease 0.3s, ClearToast linear 1s 2s forwards`;
        toast.innerHTML = `
          <div class="toast__icon">
              <i class="fas fa-check-circle"></i>
          </div>
          <div class="toast__body">
              <h3 class="toast__title">Success</h3>
              <p class="toast__msg">Add To Cart Successfully <a href="/shoppingcart" class="toast__view">View Cart</a></p>
          </div>
          <div class="toast__close">
              <i class="fas fa-times"></i>
          </div>
      `;
        main.appendChild(toast);
    }
}
