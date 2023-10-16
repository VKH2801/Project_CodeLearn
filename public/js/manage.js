//Đăng Xuất ............................
function removeItem() {
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.removeItem("UserName");
}
// Load Sẩn Phẩm.............
function LoadData() {
    $.post("http://localhost:3000/Manage/Load", {}, (data, status) => {
        html = "";
        for (i = 0; i < data.length; i++) {
            if (data[i].Tinhtrang) {
                html += `
                <li>
                <div class="Product-middle">
                  <img src="/images/${data[i].HinhSP}" alt="img" />
                  <div class="Buy-Now">
                    <span onclick="LoadModal(${data[i].MaSP},'${data[i].TenSP}',${data[i].GiaSP},'${data[i].XuatSu}',${data[i].Gioitinh},${data[i].SL},'${data[i].HinhSP}')"><i class="fa-regular fa-pen-to-square"></i></span>
                    <span onclick="DispperSP(${data[i].MaSP},${data[i].Tinhtrang})"><i class="fa-regular fa-eye-slash"></i></span>
                  </div>
                </div>
                <div class="Product-info">
                  <a href="" class="Product-Name">${data[i].TenSP}</a>
                  <a href="" class="Product-Priece">$${data[i].GiaSP}</a>
                </div>
              </li>
                `;
            } else {
                html += `
                <li>
                <div class="Product-middle">
                  <img src="/images/${data[i].HinhSP}" alt="img" />
                  <div class="Buy-Now">
                  <span onclick="LoadModal(${data[i].MaSP},'${data[i].TenSP}',${data[i].GiaSP},'${data[i].XuatSu}',${data[i].Gioitinh},${data[i].SL},'${data[i].HinhSP}')"><i class="fa-regular fa-pen-to-square"></i></span>
                    <span onclick="DispperSP(${data[i].MaSP},${data[i].Tinhtrang})"><i class="fa-regular fa-eye-slash"></i></span>
                  </div>
                </div>
                <div class="Product-info">
                  <a href="" class="Product-Name">${data[i].TenSP}</a>
                  <a href="" class="Product-Priece">$${data[i].GiaSP}</a>
                  <a href="" class="Product-Status">Sold Out</a>
                </div>
              </li>
                `;
            }
        }
        $(".Products").html(html);
    });
}
// Tắt modal .............
function TurnOffModal() {
    document.getElementById("Modal-Add").style.display = "none";
    document.getElementById("Modal-Update").style.display = "none";
}
// Tìm kiếm sản phẩm ............
function FindProducts() {
    $.post(
        "http://localhost:3000/Manage/FindProducts",
        {
            NameSP: $(".Input-Search").val(),
        },
        (data, status) => {
            html = ``;
            for (i = 0; i < data.length; i++) {
                if (data[i].Tinhtrang) {
                    html += `
                  <li>
                  <div class="Product-middle">
                    <img src="/images/${data[i].HinhSP}" alt="img" />
                    <div class="Buy-Now">
                    <span onclick="LoadModal(${data[i].MaSP},'${data[i].TenSP}',${data[i].GiaSP},'${data[i].XuatSu}',${data[i].Gioitinh},${data[i].SL},'${data[i].HinhSP}')"><i class="fa-regular fa-pen-to-square"></i></span>
                      <span onclick="DispperSP(${data[i].MaSP},${data[i].Tinhtrang})"><i class="fa-regular fa-eye-slash"></i></span>
                    </div>
                  </div>
                  <div class="Product-info">
                    <a href="" class="Product-Name">${data[i].TenSP}</a>
                    <a href="" class="Product-Priece">$${data[i].GiaSP}</a>
                  </div>
                </li>
                  `;
                } else {
                    html += `
                  <li>
                  <div class="Product-middle">
                    <img src="/images/${data[i].HinhSP}" alt="img" />
                    <div class="Buy-Now">
                    <span onclick="LoadModal(${data[i].MaSP},'${data[i].TenSP}',${data[i].GiaSP},'${data[i].XuatSu}',${data[i].Gioitinh},${data[i].SL},'${data[i].HinhSP}')"><i class="fa-regular fa-pen-to-square"></i></span>
                      <span onclick="DispperSP(${data[i].MaSP},${data[i].Tinhtrang})"><i class="fa-regular fa-eye-slash"></i></span>
                    </div>
                  </div>
                  <div class="Product-info">
                    <a href="" class="Product-Name">${data[i].TenSP}</a>
                    <a href="" class="Product-Priece">$${data[i].GiaSP}</a>
                    <a href="" class="Product-Status">Out of stock</a>
                  </div>
                </li>
                  `;
                }
            }
            $(".Products").html(html);
        }
    );
}
$(document).ready(() => {
    var user = JSON.parse(localStorage.getItem("UserName"));
    $(".Name").html(`WelCome : ` + user.tenTK);
    LoadData();
});
// Load Modal Sản Phẩm ..............
function ApperAdd() {
    document.getElementById("Modal-Add").style.display = "block";
    $("#Images-Product").change(function () {
        filename = this.files[0].name;
        $("#Choosen-images").val(filename);
    });
}
// Thêm Sản Phẩm .....................
function Additem() {
    if ($("#Name-Product").val() == "" || $("#Price-Product").val() == "" || $("#Origin-Product").val() == "" || $("#Sex-Product").val() == "" || $("#Amount-Product").val() == "" || $("#Images-Product").val() == "") {
        alert("Please Enter In Full");
    } else {
        $.post(
            "http://localhost:3000/Manage/Additem",
            {
                NameSP: $("#Name-Product").val(),
                PriceSP: $("#Price-Product").val(),
                OriginSP: $("#Origin-Product").val(),
                SexSP: $("#Sex-Product").val(),
                AmountSP: $("#Amount-Product").val(),
                ImageSP: $("#Choosen-images").val(),
            },
            (data, status) => {
                swal({
                    title: data,
                    icon: "success",
                    button: "OK !",
                }).then((willDelete) => {
                    if (willDelete) {
                        var b = document.getElementById("Modal-Add");
                        b.style.display = "none";
                        LoadData();
                    }
                });
            }
        );
    }
}
// Ẩn Sản Phẩm Khỏi Trang ...................
function DispperSP(id, status) {
    swal({
        title: "Are you sure?",
        text: "Will you hide this product from customers !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            if (status) {
                $.post(
                    "http://localhost:3000/Manage/DispperStatus",
                    {
                        MaSP: id,
                        Tinhtrang: status,
                    },
                    (data, status) => {
                        swal({
                            title: data,
                            icon: "success",
                            button: "OK !",
                        }).then((willDelete) => {
                            if (willDelete) {
                                LoadData();
                            }
                        });
                    }
                );
            } else {
                $.post(
                    "http://localhost:3000/Manage/ApperStatus",
                    {
                        MaSP: id,
                        Tinhtrang: status,
                    },
                    (data, status) => {
                        swal({
                            title: data,
                            icon: "success",
                            button: "OK !",
                        }).then((willDelete) => {
                            if (willDelete) {
                                LoadData();
                            }
                        });
                    }
                );
            }
        } else {
            swal("You are very knowledgeable!");
        }
    });
}
// Load Modal Update ............................
function LoadModal(id, TenSP, GiaSP, XuatSu, GioiTinh, SL, HinhSP) {
    $("#Images-Update").change(function () {
        filename = this.files[0].name;
        $("#Text-Image").html(filename);
        $("#Choosen-Update").val(filename);
    });
    let sex;
    if (GioiTinh) {
        sex = 1;
    } else {
        sex = 0;
    }
    $("#Id-Update").val(id);
    $("#Name-Update").val(TenSP);
    $("#Price-Update").val(GiaSP);
    $("#Origin-Update").val(XuatSu);
    $("#Sex-Update").val(sex);
    $("#Amount-Update").val(SL);
    $("#Choosen-Update").val(HinhSP);
    $("#Text-Image").html(HinhSP);
    document.getElementById("Modal-Update").style.display = "block";
}
// Update Sản Phẩm ...............
function UpdateSP() {
    if ($("#Name-Update").val() == "" || $("#Price-Update").val() == "" || $("#Origin-Update").val() == "" || $("#Sex-Update").val() == "" || $("#Amount-Update").val() == "" || $("#Choosen-Update").val() == "") {
        alert("Please Enter In Full");
    } else {
        $.post(
            "http://localhost:3000/Manage/UpdateItem",
            {
                IdSP: $("#Id-Update").val(),
                NameSP: $("#Name-Update").val(),
                PriceSP: $("#Price-Update").val(),
                OriginSP: $("#Origin-Update").val(),
                SexSP: $("#Sex-Update").val(),
                AmountSP: $("#Amount-Update").val(),
                ImageSP: $("#Choosen-Update").val(),
            },
            (data, status) => {
                swal({
                    title: data,
                    icon: "success",
                    button: "OK !",
                }).then((willDelete) => {
                    if (willDelete) {
                        var b = document.getElementById("Modal-Update");
                        b.style.display = "none";
                        LoadData();
                    }
                });
            }
        );
    }
}
