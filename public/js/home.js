$(document).ready(function () {
    showSlides();
    loadProduct();
    loadBestseller();

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

let slideIndex = 0;

function logOut() {
    localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace("/login");
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
}

function sapXep() {
    let storage = JSON.parse(localStorage.getItem("listItem"));
    storage.sort(function (a, b) {
        return a.idSP - b.idSP;
    });
    localStorage.setItem("listItem", JSON.stringify(storage));
}

function loadProduct() {
    $.post("http://localhost:3000/home/getProduct", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            var dt = $(`
                        <div class="product-item">
                            <div class="product-item-control">
                                <div class="product-item-block item-search">
                                    <a href="/shopping"><i class="fa-solid fa-magnifying-glass"></i></a>
                                </div>
                                <div class="product-item-block item-cart">
                                    <i class="fa-solid fa-cart-plus" onclick="addItem(${data[i].MaSP})"></i>
                                </div>
                            </div>
                            <div class="product-top">
                                <img src="/images/${data[i].HinhSP}" alt="product-images" />
                            </div>
                            <div class="product-info">
                                <h5 class="product-info-title">${data[i].TenSP}</h5>
                                <div class="product-rate">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                <div class="product-price">
                                    <span>${data[i].GiaSP}$</span>
                                </div>
                            </div>
                        </div>   
                    `);
            $("#listProduct").append(dt);
        }
    });
}

function loadBestseller() {
    $.post("http://localhost:3000/home/getBestSeller", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            var dt = $(`
                        <div class="sub-product-card">
                            <div class="sub-product-img">
                                <img src="/images/${data[i].HinhSP}" alt="img" style="width: 100%; height: 100%" />
                            </div>
                            <div class="sub-product-content">
                                <h5 class="product-info-title">${data[i].TenSP}</h5>
                                <div class="product-rate">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                <div class="product-price">
                                    <span>${data[i].GiaSP}$</span>
                                </div>
                                <a href="/shopping"><button class="btn-card">SHOP NOW</button></a>
                            </div>
                        </div>   
                    `);
            $("#listBestSeller").append(dt);
        }
    });
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

function createItem(id, quantity) {
    var newItem = new Object();
    newItem.idSP = id;
    newItem.quantity = quantity;
    return newItem;
}

function addItem(id) {
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
