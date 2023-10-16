var getStorage = localStorage.getItem("listItem");
var listItemCart = [];

// Xóa sản phẩm
function reMove(id) {
    id = parseInt(id);
    let storage = JSON.parse(getStorage);
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].idSP == id) {
            storage.splice(i, 1);
        }
    }
    if (storage.length == 0) {
        localStorage.removeItem("listItem");
    } else {
        localStorage.setItem("listItem", JSON.stringify(storage));
    }
    window.location.reload();
}

// Xóa tất cả
function clearAll() {
    localStorage.removeItem("listItem");
    window.location.replace("/shoppingcart");
}

// Cập nhật giá
function updatePrice() {
    let listPrice = document.querySelectorAll("#item-price");
    let listProduct = JSON.parse(localStorage.getItem("listItem"));
    let totalPrice;
    for (let i = 0; i < listPrice.length; i++) {
        totalPrice = parseInt(listPrice[i].innerHTML) * parseInt(listProduct[i].quantity);
        document.querySelectorAll("#total-price")[i].innerHTML = totalPrice;
    }
    updateTotalPrice();
}

// Cập nhật tổng giá
function updateTotalPrice() {
    let listPrice = document.querySelectorAll("#total-price");
    let total = 0;
    for (let i = 0; i < listPrice.length; i++) {
        total = total + parseInt(listPrice[i].innerHTML);
    }
    document.getElementById("cart-total-price").innerHTML = total;
    document.getElementById("total-bill").innerHTML = total;
}

// Tăng số lượng sản phẩm
function plus(id) {
    let storage = JSON.parse(localStorage.getItem("listItem"));
    let indexElement = storage.findIndex(function (itemElement) {
        return itemElement.idSP == id;
    });

    if (storage[indexElement].quantity < 10 && storage[indexElement].quantity < listItemCart[indexElement].SL) {
        storage[indexElement].quantity++;
        document.querySelectorAll("#count-id")[indexElement].innerHTML = storage[indexElement].quantity;
    }
    localStorage.setItem("listItem", JSON.stringify(storage));
    updatePrice();
}

// Giảm số lượng sản phẩm
function minus(id) {
    let storage = JSON.parse(localStorage.getItem("listItem"));
    let indexElement = storage.findIndex(function (itemElement) {
        return itemElement.idSP == id;
    });
    if (storage[indexElement].quantity > 1) {
        storage[indexElement].quantity--;
        document.querySelectorAll("#count-id")[indexElement].innerHTML = storage[indexElement].quantity;
    }
    localStorage.setItem("listItem", JSON.stringify(storage));
    updatePrice();
}

// Xóa tất cả giỏ hàng
function removeAll() {
    if (confirm("Are you sure!") == true) {
        localStorage.removeItem("listItem");
        window.location.replace("/shoppingcart");
    }
}

function logOut() {
    localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace("/login");
}

function checkCoupon() {
    let storage = JSON.parse(localStorage.getItem("UserName"));
    let MaKM = $("#coupon-code").val();
    $.post(
        "http://localhost:3000/shoppingcart/checkCoupon",
        {
            Capbac: storage.Capbac,
            MaKM: MaKM,
        },
        function (data, status) {
            if (data.length != 0) {
                $("#popup-coupon").css("display", "none");
                $("#coupon-code").css("border-color", "green");
                $("#coupon-code-hidden").val(MaKM);
                $("#discount-price").html(data[0].GiaTri);
                let totalPrice = $("#cart-total-price").html();
                let phanTramThanhTien = (parseFloat(totalPrice) / 100) * parseFloat(data[0].GiaTri);
                let totalBill = parseFloat(totalPrice) - phanTramThanhTien;
                $("#total-bill").html(Math.ceil(totalBill));
            } else {
                $("#popup-coupon").css("display", "block");
                $("#coupon-code").css("border-color", "red");
                $("#coupon-code-hidden").val("null");
                $("#discount-price").html(0);
                let a = $("#cart-total-price").html();
                $("#total-bill").html(a);
            }
        }
    );
}

function loadInfoCheckout() {
    let storage = JSON.parse(localStorage.getItem("UserName"));
    $.post(
        "http://localhost:3000/shoppingcart/loadInfoCheckOut",
        {
            tenTK: storage.tenTK,
        },
        function (data, status) {
            $("#diaChiGH").val(data[0].Diachi);
            $("#soDT").val(data[0].Sdt);
            $("#tenKH").val(data[0].TenKH);
            $("#CMND").val(data[0].CMND);
            let x = $("#total-bill").html();
            $("#tongTien").html(x);
        }
    );
}

function checkOut() {
    let CMND = $("#CMND").val();
    let NgayDat = moment().format("YYYY-MM-DD");
    let DiaChiGH = $("#diaChiGH").val();
    let MaKM = $("#coupon-code-hidden").val();
    let TongTien = $("#tongTien").html();
    let dsSP = JSON.parse(localStorage.getItem("listItem"));
    let dsGiaTungSP = document.querySelectorAll("#total-price");
    for (let i = 0; i < dsSP.length; i++) {
        dsSP[i].tongTienTungSP = parseInt(dsGiaTungSP[i].innerHTML);
    }
    $.post(
        "http://localhost:3000/shoppingcart/checkOut",
        {
            CMND,
            NgayDat,
            MaKM,
            TongTien,
            DiaChiGH,
            dsSP,
        },
        function (data, status) {
            alert(data);
            localStorage.removeItem("listItem");
            window.location.href = "/user";
        }
    );
}

function loadModal() {
    var user = JSON.parse(localStorage.getItem("UserName"));
    if (user == null || user.LoaiTK == "admin     ") {
        window.location.replace("/login");
    } else {
        loadInfoCheckout();
        const showModal = document.getElementById("myModal");
        const btnCancel = document.getElementById("btnCancel");
        const btnOk = document.getElementById("btnOk");
        const btnExit = document.getElementById("btnExit");
        showModal.style.display = "flex";
        btnCancel.onclick = function () {
            showModal.style.display = "none";
        };
        btnOk.onclick = function () {
            checkOut();
        };
        btnExit.onclick = function () {
            showModal.style.display = "none";
        };
    }
}

$(document).ready(function () {
    function loadSP() {
        var getStorage = JSON.parse(localStorage.getItem("listItem"));
        if (getStorage == null) {
            var dt = $(`
                <tr>
                    <td></td>
                    <td>There are no items in your cart</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                `);
            $("#listSP").append(dt);
            $("#btn-checkout").css("display", "none");
            $("#btn-check-coupon").css("display", "none");
            $("#btn-remove-all").css("display", "none");
        } else {
            var newArr = getStorage.map(function (e) {
                return e.idSP;
            });
            storage = JSON.stringify(newArr).replace("[", "(").replace("]", ")");
            $.post(
                "http://localhost:3000/shoppingcart/loadCart",
                {
                    stored: storage,
                },
                function (data, status) {
                    listItemCart = data;
                    let gender;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].Gioitinh) gender = "MALE";
                        else gender = "FEMALE";

                        var dt = $(`
                            <tr class="product-tr">
                                <td class="product-td-img">
                                    <div class="product-img">
                                        <img src="/images/${data[i].HinhSP}" alt="" />
                                    </div>
                                </td>
                                <td class="product-td-name">
                                    <div class="product-name">${data[i].TenSP}</div>
                                    <div class="product-size">GENDER: ${gender}</div>
                                </td>
                                <td class="product-td-price" id="item-price">${data[i].GiaSP}<span>$</span></td>
                                <td class="product-td-count">
                                    <div class="count-container">
                                        <div class="btn-count">
                                            <i class="fa-solid fa-circle-minus" onclick="minus(${data[i].MaSP})"></i>
                                        </div>
                                        <span class="product-count" id="count-id">${getStorage[i].quantity}</span>
                                        <div class="btn-count">
                                            <i class="fa-solid fa-circle-plus" onclick="plus(${data[i].MaSP})"></i>
                                        </div>
                                        <div class="popup-inventory"><span>${data[i].SL}</span> items left</div>
                                    </div>
                                </td>
                                <td class="product-td-price"><span id="total-price">${data[i].GiaSP}</span>$</td>
                                <td class="product-td-delete"><i class="fa-solid fa-trash-can" onclick="reMove(${data[i].MaSP})"></i></td>
                            </tr>
                            `);
                        $("#listSP").append(dt);
                        if (data[i].SL < 10) {
                            let listPopup = document.querySelectorAll(".popup-inventory");
                            listPopup[i].style.display = "block";
                        }
                    }
                    updatePrice();
                    updateTotalPrice();
                }
            );
        }
    }
    loadSP();

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
